export class Order {
    public id: number;
    public custormerID: number;    
    public maDonhang: string;    
    public created_at: Date;
    public updated_at: Date;
    constructor (
        id: number,     
        custormerID:number, 
        maDonhang: string,   
        created_at: Date,
        updated_at: Date) {
        this.id = id;       
        this.custormerID=custormerID;
        this.maDonhang = maDonhang;        
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
