# Deployment Guide

## Development Setup

```bash
# Backend
cd backend
npm install
npm run prisma:generate
npm run prisma:push
npm run dev
```

```bash
# Frontend
cd frontend
npm install
npm run dev
```

## Production Deployment

### Option 1: Vercel (Frontend) + Heroku (Backend)

**Backend on Heroku**
1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
2. Create app: `heroku create primetrade-api`
3. Set environment variables:
   ```bash
   heroku config:set JWT_SECRET=your-secret
   heroku config:set DATABASE_URL=your-mysql-url
   ```
4. Deploy: `git push heroku main`

**Frontend on Vercel**
1. Push code to GitHub
2. Connect repo at https://vercel.com
3. Deploy (automatic on push)

### Option 2: AWS

**EC2 for Backend**
```bash
# SSH into instance
ssh -i key.pem ubuntu@instance-ip

# Install
sudo apt-get update
sudo apt-get install nodejs mysql-server

# Deploy
git clone your-repo
cd backend
npm install
npm run prisma:push
npm start
```

**RDS for MySQL**
- Create RDS instance
- Update DATABASE_URL to RDS endpoint

**S3 + CloudFront for Frontend**
```bash
cd frontend
npm run build
aws s3 sync dist/ s3://your-bucket/
```

### Option 3: DigitalOcean App Platform

1. Connect GitHub repo
2. Create backend app (Node, port 5000)
3. Create frontend app (Static)
4. Set environment variables
5. Deploy

## Environment Variables for Production

**Backend**
```
NODE_ENV=production
PORT=5000
DATABASE_URL=mysql://user:password@prod-db/primetrade
JWT_SECRET=<strong-random-string>
FRONTEND_URL=https://your-domain.com
```

**Frontend**
```
VITE_API_URL=https://your-backend-domain.com/api/v1
```

## Database Backup

```bash
# Backup MySQL
mysqldump -u user -p primetrade > backup.sql

# Restore
mysql -u user -p primetrade < backup.sql
```

## Security Checklist

- [ ] Use HTTPS/SSL certificate
- [ ] Change JWT_SECRET to strong value
- [ ] Never commit .env to Git
- [ ] Enable database backups
- [ ] Set up monitoring/logging
- [ ] Configure firewall rules
- [ ] Use environment-specific config

## Common Hosting Options

| Platform | Frontend | Backend | Database |
|----------|----------|---------|----------|
| Vercel | ✅ | ❌ | - |
| Heroku | ❌ | ✅ | ✅ |
| AWS | ✅ | ✅ | ✅ |
| DigitalOcean | ✅ | ✅ | ✅ |
| Railway | ✅ | ✅ | ✅ |

## Health Check

Test backend is running:
```bash
curl http://localhost:5000/health
```

Expected: `{"success":true,"message":"Server is healthy"}`

