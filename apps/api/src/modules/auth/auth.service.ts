import { Injectable } from "@nestjs/common"; @Injectable() export class AuthService { login(email: string) { return { accessToken: "demo-token", user: { email, role: "admin" } }; } }
