/**
 * Firestore Security Rules for JobaLink Platform
 *
 * These rules should be deployed to Firebase Firestore.
 * Copy the content below to your firestore.rules file.
 *
 * IMPORTANT: These rules enforce strict access control:
 * - Users can only read/write their own profile data
 * - Project data has role-based access control
 * - Contact information is only visible after mutual project acceptance
 * - All transactions are logged for audit purposes
 */

export const FIRESTORE_RULES = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Helper function to check if user owns the document
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    // Helper function to check user role
    function hasRole(role) {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == role;
    }
    
    // Users collection - strict access control
    match /users/{userId} {
      // Users can only read their own profile
      allow read: if isOwner(userId);
      
      // Users can only create their own profile during registration
      allow create: if isAuthenticated() && request.auth.uid == userId;
      
      // Users can only update their own profile
      allow update: if isOwner(userId) && 
                       // Prevent role changes after creation
                       request.resource.data.role == resource.data.role;
      
      // No deletion allowed
      allow delete: if false;
    }
    
    // Joba Profiles - extended profile data for service providers
    match /jobaProfiles/{jobaId} {
      // Public read for basic info (name, skills, rating) for search
      allow read: if isAuthenticated();
      
      // Only the Joba can write their own profile
      allow write: if isOwner(jobaId) && hasRole('joba');
      
      // Contact information subcollection - restricted access
      match /privateInfo/{document=**} {
        // Only the Joba owner can read their private info
        allow read: if isOwner(jobaId);
        allow write: if isOwner(jobaId);
      }
    }
    
    // Link Profiles - client profile data
    match /linkProfiles/{linkId} {
      // Links can read their own profile
      allow read: if isOwner(linkId);
      
      // Only the Link can write their own profile
      allow write: if isOwner(linkId) && hasRole('link');
    }
    
    // Projects collection - complex access control
    match /projects/{projectId} {
      // Public read for project listings (Jobas searching for work)
      allow read: if isAuthenticated() && hasRole('joba');
      
      // Links can read their own projects
      allow read: if isAuthenticated() && 
                     resource.data.linkId == request.auth.uid;
      
      // Jobas can read projects they're assigned to
      allow read: if isAuthenticated() && 
                     resource.data.assignedJobaId == request.auth.uid;
      
      // Only Links can create projects
      allow create: if isAuthenticated() && 
                       hasRole('link') && 
                       request.resource.data.linkId == request.auth.uid;
      
      // Links can update their own projects
      allow update: if isAuthenticated() && 
                       resource.data.linkId == request.auth.uid;
      
      // Jobas can update project status when assigned
      allow update: if isAuthenticated() && 
                       resource.data.assignedJobaId == request.auth.uid &&
                       // Only allow status updates, not other fields
                       request.resource.data.diff(resource.data).affectedKeys()
                         .hasOnly(['status', 'updatedAt']);
      
      // No deletion allowed (maintain audit trail)
      allow delete: if false;
      
      // Contact information - only visible after project acceptance
      match /contactInfo/{document=**} {
        allow read: if isAuthenticated() && 
                       (resource.data.linkId == request.auth.uid || 
                        resource.data.assignedJobaId == request.auth.uid) &&
                       get(/databases/$(database)/documents/projects/$(projectId)).data.status != 'OPEN';
      }
    }
    
    // Transactions collection - immutable audit log
    match /transactions/{transactionId} {
      // Users can only read their own transactions
      allow read: if isAuthenticated() && 
                     (resource.data.jobaId == request.auth.uid || 
                      resource.data.linkId == request.auth.uid);
      
      // Only system can create transactions (server-side only)
      allow create: if false;
      
      // Transactions are immutable
      allow update, delete: if false;
    }
    
    // Escrow records - payment custody tracking
    match /escrow/{escrowId} {
      // Only involved parties can read escrow records
      allow read: if isAuthenticated() && 
                     (resource.data.jobaId == request.auth.uid || 
                      resource.data.linkId == request.auth.uid);
      
      // Only system can manage escrow (server-side only)
      allow write: if false;
    }
    
    // Reviews and ratings
    match /reviews/{reviewId} {
      // Public read for all authenticated users
      allow read: if isAuthenticated();
      
      // Only the reviewer (Link) can create a review for their completed project
      allow create: if isAuthenticated() && 
                       hasRole('link') &&
                       request.resource.data.linkId == request.auth.uid &&
                       // Verify project is completed
                       get(/databases/$(database)/documents/projects/$(request.resource.data.projectId)).data.status == 'CONCLUIDO';
      
      // Reviews are immutable after creation
      allow update, delete: if false;
    }
    
    // Chat messages
    match /chats/{chatId}/messages/{messageId} {
      // Only participants can read messages
      allow read: if isAuthenticated() && 
                     (get(/databases/$(database)/documents/chats/$(chatId)).data.participants[request.auth.uid] == true);
      
      // Only participants can send messages
      allow create: if isAuthenticated() && 
                       get(/databases/$(database)/documents/chats/$(chatId)).data.participants[request.auth.uid] == true &&
                       request.resource.data.senderId == request.auth.uid;
      
      // Messages are immutable
      allow update, delete: if false;
    }
  }
}
`

// Export as a downloadable file content
export function generateFirestoreRulesFile(): string {
  return FIRESTORE_RULES
}
