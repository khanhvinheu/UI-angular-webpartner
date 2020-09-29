export class Taikhoan {
    public id: number;
    public partnerID: number;
    public tenNhanvien: string;
    public chucVu: Date;
    public name: string;
    public email: string;   
    public password: string;
    public hinhAnh: string;
    public quyen:number;
    public created_at: Date;
    public updated_at: Date;     
    constructor (
        id: number,
        partnerID: number,
        tenNhanvien: string,
        chucVu: Date,
        name: string,
        email: string,
        password: string,  
        hinhAnh:string,
        quyen:number,    
        created_at: Date,
        updated_at: Date) {
        this.id = id;
        this.partnerID = partnerID;
        this.tenNhanvien = tenNhanvien;
        this.chucVu=chucVu;
        this.name=name;
        this.email = email;
        this.password = password;     
        this.hinhAnh=hinhAnh;      
        this.quyen=quyen; 
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
