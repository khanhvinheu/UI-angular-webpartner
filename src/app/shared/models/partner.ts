export class Partner {
    public id: number;    
    public tenCongty: string;
    public diaChi: string;
    public created_at: Date;
    public updated_at: Date;
    constructor (
        id: number,      
        tenCongty: string,       
        diaChi: string,
        created_at: Date,
        updated_at: Date) {
        this.id = id;       
        this.tenCongty = tenCongty;
        this.diaChi = diaChi;        
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
