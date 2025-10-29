# GitHub OAuth Setup for Decap CMS

## Steps to Configure GitHub OAuth

1. **Create GitHub OAuth App**
   - Go to GitHub Settings → Developer settings → OAuth Apps
   - Click "New OAuth App"
   - Fill in:
     - Application name: Lazy Perfectionist CMS
     - Homepage URL: https://lazy-perfectionist-official.github.io/lazy-perfectionist
     - Authorization callback URL: https://lazy-perfectionist-official.github.io/lazy-perfectionist/admin/
   - Click "Register application"

2. **Get Client ID**
   - Copy the Client ID from the OAuth app page
   - Add it to `static/cms/config.yml` in the `client_id` field

3. **Generate Client Secret** (Optional for PKCE)
   - Decap CMS uses PKCE by default, so client secret is not required
   - If needed, generate a client secret and keep it secure

4. **Update Configuration**
   - Edit `static/cms/config.yml`
   - Replace `# Add your GitHub OAuth App Client ID here` with your actual Client ID

5. **Test the CMS**
   - Visit https://lazy-perfectionist-official.github.io/lazy-perfectionist/admin/
   - Click "Login with GitHub"
   - Authorize the application
   - Start editing content!

## Notes

- PKCE authentication is more secure and doesn't require storing client secrets
- The CMS will automatically commit changes back to your GitHub repository
- All your existing collections (About, EP, Blog) are preserved