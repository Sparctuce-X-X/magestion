# ✅ Checklist Authentification JWT (Angular + Spring Boot)

## 1. Back-end (Spring Boot)
- [x] Créer un endpoint `/auth/login` qui accepte les identifiants (email/mot de passe), les valide, et retourne un JWT si la connexion est réussie.
- [x] Ajouter une dépendance JWT dans le `pom.xml` (ex : `jjwt` ou `spring-boot-starter-jwt`).
- [x] Générer un JWT lors de la connexion et le retourner dans la réponse.
- [x] Créer un filtre de sécurité JWT qui :
  - [x] Intercepte chaque requête.
  - [x] Extrait et valide le token JWT du header `Authorization: Bearer ...`.
  - [x] Autorise l'accès si le token est valide.
- [x] Adapter la configuration Spring Security pour :
  - [x] Permettre l'accès libre à `/auth/login`.
  - [x] Protéger les autres routes via le filtre JWT.
  - [x] Désactiver ou ajuster `httpBasic()` si besoin.

## 2. Front-end (Angular)
- [x] Vérifier que le service d'authentification envoie bien la requête à `/auth/login` et stocke le token JWT.
- [x] Vérifier que l'interceptor ajoute le header `Authorization: Bearer <token>` à chaque requête API.
- [x] Gérer la déconnexion en supprimant le token du stockage local.
- [x] Gérer les erreurs 401 (redirection vers la page de login si le token est invalide ou expiré).

## 3. Tests
- [ ] Tester la connexion avec des identifiants valides et invalides.
- [ ] Tester l'accès aux routes protégées avec et sans token.
- [ ] Vérifier la persistance du token (après refresh, etc.).
- [ ] Vérifier la déconnexion (suppression du token et accès bloqué). 