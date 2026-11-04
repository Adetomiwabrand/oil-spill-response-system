# AI-assisted implementation log

## 2026-07-29

### Auth and account onboarding changes
- Added full-name and company-name collection to the member portal signup form.
- Wired signup to store profile metadata in the Supabase auth user metadata and create/update a matching row in the public.profiles table.
- Added handling for the Supabase password-reset flow and cleaned the auth hash redirect in the reset-password page.
- Hardened the profile creation flow to preserve an existing role instead of overwriting it with a default member role.
- Updated the profile hook to refresh role information from Supabase whenever auth state changes.

### Mobile modal and dashboard UX changes
- Replaced the old mobile nav callout modal with the newer mobilisation modal component.
- Removed allowance-form download references from the mobilisation success screen and member dashboard footer.
- Added a loading state to the mobilisation modal so the "Members Only" gate does not flash while the auth session is resolving.

### Supabase configuration notes
- Supabase Auth email confirmations were disabled in the local config; this work should be revisited when enabling required email confirmation in the hosted project.
