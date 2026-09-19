import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"; @Injectable() export class Guard implements CanActivate { canActivate(_context: ExecutionContext) { return true; } }
