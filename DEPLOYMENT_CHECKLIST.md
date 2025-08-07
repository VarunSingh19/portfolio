# 🚀 Deployment Checklist - Blog Visibility Issue

## 📋 Environment Variables to Add on Deployment Platform

Make sure ALL these environment variables are set on your deployment platform (Vercel/Netlify/etc.):

### **Required Environment Variables:**
```
MONGODB_URI=mongodb+srv://algovistaofficial:varun09@cluster09.xnrkn5q.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster09
RESEND_API_KEY=re_emZnB1zz_FEQksdu6u1d4Pb33gFLkxjGT
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=drr7vhcqu
CLOUDINARY_API_KEY=729896197914814
CLOUDINARY_API_SECRET=27E9xUbBhSVe0idZaGbbPuPdx2w
NEXTAUTH_SECRET=varun09
ADMIN_EMAIL=varunsinghh2409@gmail.com
ADMIN_NAME=Varun Singh
ALLOWED_AUTHORS=Varun Singh
NEXT_PUBLIC_BASE_URL=https://your-deployed-url.vercel.app
```

## 🔧 Platform-Specific Instructions:

### **For Vercel:**
1. Go to your project dashboard
2. Click "Settings" → "Environment Variables"
3. Add each variable above
4. Redeploy your application

### **For Netlify:**
1. Go to Site Settings → Environment Variables
2. Add each variable above
3. Trigger a new deploy

## 🔍 Common Issues & Solutions:

### **Issue 1: Database Connection**
- **Problem**: Deployed app can't connect to MongoDB
- **Solution**: Verify MONGODB_URI is exactly the same as local

### **Issue 2: Different Database**
- **Problem**: Deployment uses different database/collection
- **Solution**: Ensure same MongoDB cluster and database name

### **Issue 3: API Routes Not Working**
- **Problem**: Blog API endpoints return errors
- **Solution**: Check deployment logs for API errors

### **Issue 4: Environment Variables Missing**
- **Problem**: Some env vars not set on deployment
- **Solution**: Double-check all variables are added

## 🧪 Testing Steps:

1. **Check API Endpoints:**
   - Visit: `https://your-site.com/api/blogs`
   - Should return JSON with your blogs

2. **Check Database Connection:**
   - Look at deployment logs for MongoDB connection errors

3. **Verify Environment Variables:**
   - Check deployment platform settings

## 🚨 Quick Fix Commands:

If you need to re-add blogs to production database:
```bash
# Run the blog creation script against production
node create-blog-direct.js
```

## 📞 Need Help?
If blogs still don't show, check:
1. Deployment logs for errors
2. MongoDB Atlas connection logs
3. API endpoint responses
