

export class Course {
    public id: number;
    public description: string;
    public longDescription: string;
    public iconUrl: string;
    public lessonsCount: number;
    public category: string;
    public seqNo: string;
    public url:string;
    public price: number;
    
    
    constructor(id: number, desc: string, longDes: string, icon: string, lessCount: number, cate: string, seq: string, url: string, price: number) {
       this.id = id;
       this.description = desc;
       this.longDescription = longDes;
       this.iconUrl = icon;
       this.lessonsCount = lessCount;
       this.category = cate;
       this.seqNo = seq;
       this.url = url;
       this.price = price;
    }
}