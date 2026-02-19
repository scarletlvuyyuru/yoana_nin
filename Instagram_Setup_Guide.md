# Instagram Integration Setup Guide

## Overview
This setup creates an automatic Instagram feed that displays the 6 most recent posts from her coaching account. New posts automatically appear at the front, pushing older ones off without manual intervention.

## Features
- ✅ Desktop: 5-6 posts in a horizontal row
- ✅ Mobile: Swipeable carousel with navigation arrows  
- ✅ Auto-hover video preview on desktop
- ✅ Automatic updates when new posts are published
- ✅ Performance optimized with caching
- ✅ Click-through to Instagram

## Setup Steps

### 1. Instagram Basic Display API Setup

1. **Create Facebook App**:
   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Create a new app (Business type)
   - Add "Instagram Basic Display" product

2. **Configure Instagram Basic Display**:
   - Add Instagram account as Instagram Tester
   - Generate User Access Token for the coaching account
   - Note down the Access Token (expires in 60 days, but can be refreshed)

3. **Get Long-Lived Token** (optional but recommended):
   ```bash
   curl -i -X GET "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token={your-access-token}"
   ```

### 2. Netlify Environment Variables

In your Netlify dashboard, set these environment variables:

```
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here
INSTAGRAM_VERIFY_TOKEN=your_custom_verify_token_for_webhooks
NETLIFY_BUILD_HOOK_URL=your_netlify_build_hook_url
```

**To get Build Hook URL**:
1. Go to Netlify Dashboard → Site Settings → Build & Deploy
2. Scroll to "Build hooks" 
3. Add a new hook named "Instagram Auto Update"
4. Copy the webhook URL

### 3. Instagram Webhook (Optional - for instant updates)

1. **Configure Instagram Webhook**:
   - In Facebook App → Instagram Basic Display → Webhooks
   - Callback URL: `https://yoursite.netlify.app/.netlify/functions/instagram-webhook`
   - Verify Token: Use same as `INSTAGRAM_VERIFY_TOKEN`
   - Subscribe to: `feed` events

2. **Alternative: Scheduled Updates**:
   If webhooks are complex, use Netlify scheduled functions:
   
   Create `netlify/functions/scheduled-update.js`:
   ```javascript
   exports.handler = async (event, context) => {
     // Check for new posts every hour
     // Trigger build if new posts found
   };
   ```

   Add to `netlify.toml`:
   ```toml
   [[functions]]
     name = "scheduled-update"
     schedule = "0 * * * *"  # Every hour
   ```

### 4. Deploy & Test

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Test Locally**:
   ```bash
   npm run dev
   ```

3. **Deploy to Netlify**:
   ```bash
   npm run build
   ```

### 5. Content Management Workflow

Once set up:
- She posts new coaching videos to Instagram as usual
- Within 1 hour (or instantly with webhooks), the website automatically updates
- No manual intervention needed
- Old posts automatically fall off when 7+ posts exist

## Performance Notes

- **Caching**: Instagram API calls are made server-side during build time
- **No Runtime API Calls**: Frontend loads pre-fetched data, ensuring fast page loads
- **Image Optimization**: Videos show thumbnails until hover/interaction
- **Responsive**: Adapts from 5 posts (desktop) to 1 post (mobile)

## Troubleshooting

### Access Token Expired
- Instagram tokens need refresh every 60 days
- Set up automatic refresh or manual renewal reminder

### No Posts Showing
- Check Netlify function logs: Functions → instagram-feed
- Verify environment variables are set
- Test API endpoint directly: `yoursite.com/.netlify/functions/instagram-feed`

### Webhook Not Triggering
- Verify webhook URL is accessible
- Check Instagram app webhook settings
- Test manual build hook trigger

## Security Notes

- Access tokens are stored securely in Netlify environment variables
- No client-side API keys exposed
- CORS properly configured for public access
- Instagram content filtered to public posts only

## Cost Implications

- **Instagram API**: Free (basic usage limits apply)
- **Netlify Functions**: 125,000 calls/month free (more than sufficient)
- **Build Minutes**: Each update uses ~2-3 build minutes
- **No third-party services required**

This setup provides a maintenance-free Instagram integration that automatically keeps the website content fresh while maintaining excellent performance.