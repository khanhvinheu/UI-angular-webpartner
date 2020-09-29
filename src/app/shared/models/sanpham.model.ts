export class SanPham {
    public id: number;    
    public tenSanpham: string;
    public created_at: Date;
    public updated_at: Date;
    constructor (
        id: number,      
        tenSanpham: string,   
        created_at: Date,
        updated_at: Date) {
        this.id = id;       
        this.tenSanpham = tenSanpham ;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
