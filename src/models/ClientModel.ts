import {StationEssence} from "@/types.ts";

export interface Client {
    name?: string
    phone?: string
    currentPayment?: number
    totalPayment?: number
    stationEssence: StationEssence
}
export class ClientModel {
    constructor(client: Client) {
        this.name = client.name
        this.phone = client.phone
        this.currentPayment = client.currentPayment
        this.totalPayment = client.totalPayment
        this.stationEssence = client.stationEssence
    }
    name: Client['name']
    phone: Client['phone']
    totalPayment: Client['totalPayment']
    currentPayment: Client['currentPayment']
    stationEssence: Client['stationEssence']
}
