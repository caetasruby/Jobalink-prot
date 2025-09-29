# JobaLink - Documentação de Segurança

## Visão Geral

Este documento descreve as medidas de segurança implementadas na plataforma JobaLink para proteger dados de utilizadores, transações financeiras e garantir a conformidade com as melhores práticas de segurança.

## 1. Autenticação e Controlo de Acesso

### 1.1 Firebase Authentication
- Utilização do Firebase Authentication para gestão segura de utilizadores
- Senhas encriptadas com bcrypt (gerido pelo Firebase)
- Tokens JWT para sessões autenticadas
- Expiração automática de sessões após 24 horas

### 1.2 Validação de Senhas
- Mínimo de 8 caracteres
- Obrigatório: pelo menos uma letra e um número
- Recomendado: caracteres especiais para maior segurança

### 1.3 Controlo de Acesso Baseado em Papéis (RBAC)
- Dois papéis distintos: `joba` (Prestador) e `link` (Cliente)
- Middleware de Next.js protege rotas sensíveis
- Redirecionamento automático baseado no estado de autenticação

## 2. Regras de Segurança Firestore

### 2.1 Princípios de Acesso
- **Princípio do Menor Privilégio**: Utilizadores só acedem aos dados necessários
- **Segregação de Dados**: Perfis Joba e Link em coleções separadas
- **Imutabilidade de Transações**: Logs de transações não podem ser alterados

### 2.2 Regras Implementadas

#### Coleção `users`
- Leitura: Apenas o próprio utilizador
- Escrita: Apenas o próprio utilizador
- Papel (`role`) não pode ser alterado após criação

#### Coleção `jobaProfiles`
- Leitura pública: Informações básicas (nome, competências, avaliação)
- Leitura privada: Contactos apenas após aceitação mútua de projeto
- Escrita: Apenas o próprio Joba

#### Coleção `projects`
- Leitura: Jobas (para pesquisa), Link proprietário, Joba atribuído
- Criação: Apenas Links
- Atualização: Link proprietário ou Joba atribuído (apenas status)
- Eliminação: Proibida (manter trilha de auditoria)

#### Coleção `transactions`
- Leitura: Apenas partes envolvidas (Joba e Link)
- Escrita: Apenas sistema (server-side)
- Imutável: Não pode ser alterada ou eliminada

## 3. Segurança de Pagamentos

### 3.1 Sistema de Custódia (Escrow)
- Fundos retidos pela plataforma até confirmação de serviço
- Estados de custódia rastreados no Firestore
- Logs imutáveis de todas as transações

### 3.2 Integração M-Pesa/eMola
- **Simulação**: Sistema atual simula pagamentos para desenvolvimento
- **Produção**: Integração com APIs oficiais M-Pesa e eMola
- **Não Armazenamento**: Nunca armazenar senhas ou PINs de carteiras móveis
- **Validação**: Números de telefone validados por operadora

### 3.3 Auditoria de Transações
- Cada mudança de status registada com timestamp
- Metadados incluem: valor, partes envolvidas, tipo de transação
- Logs acessíveis para resolução de disputas

## 4. Proteção de Dados

### 4.1 Dados em Trânsito
- **HTTPS/SSL**: Todas as comunicações encriptadas
- **TLS 1.3**: Protocolo de segurança moderno
- Certificados SSL geridos pelo Vercel

### 4.2 Dados em Repouso
- Encriptação nativa do Firebase Firestore
- Backups automáticos encriptados
- Dados sensíveis (contactos) em subcoleções protegidas

### 4.3 Dados Pessoais (GDPR/LGPD)
- Consentimento explícito na criação de conta
- Direito ao esquecimento: Utilizadores podem solicitar eliminação de dados
- Minimização de dados: Apenas informações necessárias são recolhidas

## 5. Moderação de Conteúdo

### 5.1 Deteção Automática
- Lista de palavras proibidas
- Padrões suspeitos (ex: pagamento fora da plataforma)
- Níveis de risco: baixo, médio, alto

### 5.2 Ações de Moderação
- **Baixo Risco**: Aprovação automática
- **Médio Risco**: Revisão manual
- **Alto Risco**: Bloqueio automático e notificação de administrador

### 5.3 Sanitização de Input
- Remoção de tags HTML
- Escape de caracteres especiais
- Prevenção de ataques XSS

## 6. Verificação e Confiança

### 6.1 Verificação de Joba (KYC Leve)
- Foto de perfil obrigatória
- Biografia profissional obrigatória
- Contacto móvel validado

### 6.2 Verificação de Link/Empresa
- NIF (Número de Identificação Fiscal) opcional
- Badge "Empresa Verificada" para Links com NIF
- Transparência: Jobas veem se trabalham com Individual ou Empresa

### 6.3 Sistema de Reputação
- Avaliações de 5 estrelas
- Comentários de clientes
- Histórico de projetos concluídos

## 7. Monitorização e Resposta a Incidentes

### 7.1 Deteção de Atividades Suspeitas
- Múltiplas tentativas de login (possível força bruta)
- Tentativas de pagamento falhadas repetidas
- Conteúdo sinalizado múltiplas vezes

### 7.2 Rate Limiting
- Máximo de 10 requisições por minuto por utilizador
- Prevenção de abuso de API
- Bloqueio temporário em caso de excesso

### 7.3 Logs de Auditoria
- Todos os eventos críticos registados
- Timestamp, utilizador, ação, metadados
- Imutáveis e acessíveis para investigação

## 8. Conformidade e Melhores Práticas

### 8.1 Conformidade Legal
- Proteção de dados pessoais (LGPD/GDPR)
- Retenção de dados de transações para fins fiscais
- Termos de serviço e política de privacidade claros

### 8.2 Melhores Práticas de Desenvolvimento
- Revisão de código para vulnerabilidades
- Testes de segurança regulares
- Atualizações de dependências para patches de segurança

### 8.3 Educação de Utilizadores
- Avisos sobre pagamentos fora da plataforma
- Dicas de segurança no dashboard
- Suporte para reportar atividades suspeitas

## 9. Implementação em Produção

### 9.1 Checklist de Segurança
- [ ] Configurar Firebase Authentication em produção
- [ ] Implementar regras Firestore (copiar de `lib/security/firestore-rules.ts`)
- [ ] Configurar certificados SSL/TLS
- [ ] Ativar APIs oficiais M-Pesa e eMola
- [ ] Configurar monitorização de logs (ex: Sentry)
- [ ] Implementar backups automáticos
- [ ] Configurar rate limiting no servidor
- [ ] Adicionar autenticação de dois fatores (2FA) para Jobas

### 9.2 Variáveis de Ambiente Sensíveis
\`\`\`env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
FIREBASE_ADMIN_SDK_KEY= # Server-side only

# M-Pesa/eMola
MPESA_API_KEY= # Server-side only
EMOLA_API_KEY= # Server-side only

# Encryption
ENCRYPTION_KEY= # Server-side only
\`\`\`

## 10. Contacto de Segurança

Para reportar vulnerabilidades de segurança:
- Email: security@jobalink.co.mz
- Resposta esperada: 48 horas
- Programa de recompensas por bugs (futuro)

---

**Última Atualização**: 2025-01-XX  
**Versão**: 1.0  
**Responsável**: Equipa de Desenvolvimento JobaLink
