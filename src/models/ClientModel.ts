import {OilStation} from "@/types.ts";

export interface Client {
    name?: string
    phone?: string
    currentPayment?: number
    totalPayment?: number
    oilStation: OilStation
}
export class ClientModel {
    constructor(client: Client) {
        this.name = client.name
        this.phone = client.phone
        this.currentPayment = client.currentPayment
        this.totalPayment = client.totalPayment
        this.oilStation = client.oilStation
    }
    name: Client['name']
    phone: Client['phone']
    totalPayment: Client['totalPayment']
    currentPayment: Client['currentPayment']
    oilStation: Client['oilStation']
}
