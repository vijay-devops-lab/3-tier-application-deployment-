# Deploying a MERN 3-Tier Architecture on AWS

## 1. Overview

This document explains, step by step, how to deploy a **MERN stack application** using a **3-Tier Architecture on AWS**. The architecture follows real-world production standards used in enterprises.

![](https://raw.githubusercontent.com/vijay-devops-lab/3-tier-application-deployment-/refs/heads/main/asset/aws%203tier.png)

### 3 Tiers

1. **Presentation Tier** – React Frontend
2. **Application Tier** – Node.js / Express Backend
3. **Data Tier** – Amazon RDS (MySQL)

---

## 2. High-Level Architecture

**Flow:**
User → Internet → Application Load Balancer (ALB) → Backend EC2 (Private Subnet) → RDS MySQL

**Key Principles:**

* No backend or database is publicly exposed
* Traffic is controlled using Security Groups
* High availability using Multi-AZ

---

## 3. VPC Setup

### 3.1 Create VPC

* CIDR: `10.0.0.0/16`

### 3.2 Subnets

| Tier           | Subnet Type | AZs                      |
| -------------- | ----------- | ------------------------ |
| Frontend / ALB | Public      | ap-south-1a, ap-south-1b |
| Backend        | Private     | ap-south-1a              |
| Database       | Private     | ap-south-1a, ap-south-1b |

### 3.3 Internet & NAT Gateway

* Internet Gateway attached to VPC
* NAT Gateway in public subnet
* Private subnets route internet traffic via NAT

---

## 4. Security Groups

### 4.1 ALB Security Group

* Inbound: HTTP 80 from `0.0.0.0/0`
* Outbound: All

### 4.2 Backend EC2 Security Group

* Inbound: TCP 5000 **from ALB SG only**
* Outbound: All

### 4.3 RDS Security Group

* Inbound: TCP 3306 **from Backend SG only**
* Outbound: All

---

## 5. Database Tier – Amazon RDS

### 5.1 RDS Configuration

* Engine: MySQL
* Instance: `db.t4g.micro`
* Public access: ❌ Disabled
* Subnet group: Private subnets only

### 5.2 RDS Endpoint Example

```
mern-db.c1466828yxxw.ap-south-1.rds.amazonaws.com:3306
```

---

## 6. Application Tier – Backend (Node.js)

### 6.1 EC2 Setup

* Instance: Ubuntu 22.04
* Subnet: Private
* No public IP

### 6.2 Backend Environment Variables

```
PORT=5000
DB_HOST=mern-db.c1466828yxxw.ap-south-1.rds.amazonaws.com
DB_USER=<db-user>
DB_PASSWORD=<db-password>
DB_NAME=<db-name>
NODE_ENV=production
```

### 6.3 Dockerized Backend

* Backend runs inside Docker container
* Port mapping: `5000:5000`

### 6.4 Health Check Endpoint

```
GET /health
Response: 200 OK
```

---

## 7. Load Balancer – Application Load Balancer (ALB)

### 7.1 ALB Configuration

* Type: Application Load Balancer
* Scheme: Internet-facing
* Subnets: Public subnets (Multi-AZ)

### 7.2 Listener

* HTTP 80 → Forward to Target Group

### 7.3 Target Group

* Target type: Instance
* Protocol: HTTP
* Port: 5000
* Health check path: `/health`

---

## 8. Presentation Tier – Frontend

### 8.1 Frontend Hosting Options

* S3 + CloudFront OR
* EC2 + NGINX

### 8.2 Backend API Configuration

```
API_BASE_URL=http://<ALB-DNS>
```

---

## 9. Validation Checklist

✅ ALB target shows **Healthy**

```
curl http://<ALB-DNS>/health
```

✅ Backend connects to RDS

```
MySQL connected successfully
```

✅ No public access to backend or DB

---

## 10. Production Best Practices (Next Steps)

* Enable HTTPS (ACM + ALB)
* Auto Scaling Group for backend
* Use Secrets Manager for DB credentials
* Enable ALB access logs
* Add CloudWatch alarms

---

## 11. Interview Explanation (Short)

> “I deployed a MERN application using a 3-tier AWS architecture where the frontend communicates with an Application Load Balancer, which securely routes traffic to a private EC2 backend. The backend connects to a private RDS MySQL database using security-group-based access. This setup ensures scalability, security, and high availability.”

---

## 12. Conclusion

This deployment follows **enterprise-grade AWS architecture** standards and demonstrates strong knowledge of:

* Networking (VPC, subnets, routing)
* Security (SG isolation)
* Backend scalability
* Cloud-native deployment patterns

🎯 **This project is resume-ready and interview-ready.**
