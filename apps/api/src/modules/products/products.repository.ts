import { Injectable } from "@nestjs/common"; @Injectable() export class ProductsRepository { findAll() { return [{ id: "p-001", name: "Premium Concealed Shower Mixer", price: 18500 }]; } }
