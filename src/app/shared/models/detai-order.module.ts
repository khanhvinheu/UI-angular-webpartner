export class DetailsOrder {
    public id: number;
    public orderID: number;    
    public tenNhanvien: string;    
    public tenCongty: string; 
    public tenSanpham: string;  
    public soLuong: number; 
    public ngayMuahang: Date;            
    public created_at: Date;
    public updated_at: Date;
    constructor (
        id: number,     
        orderID:number, 
        tenNhanvien: string,   
        tenCongty:string,
        tenSanpham:string,
        soLuong: number,
        ngayMuahang:Date,
        created_at: Date,
        updated_at: Date) {
        this.id = id;       
        this.orderID=orderID,
        this.tenNhanvien=tenNhanvien,
        this.tenCongty=tenCongty,
        this.tenSanpham=tenSanpham,
        this.soLuong=soLuong,
        this.ngayMuahang=ngayMuahang,      
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
