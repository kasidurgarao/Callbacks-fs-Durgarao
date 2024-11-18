import fs from 'fs'
import path from 'path'
const dirPath = './Durgarao';

const data = {
    name:'rao',
    number:1234
}
export function readAndDelete(){
fs.mkdir(dirPath,{recursive:true},(err)=>{
    if(err){
        console.log(err)
    }
    for(let i=1;i<=5;i++){
        const filepath=path.join(dirPath,`file-${i}.json`)
        fs.writeFile(filepath,JSON.stringify(data,null,2),err=>{
            if(err){
                console.log(err)
            }
        })
        console.log(`file-${i} created`)
        if(i===5){
            fs.readdir(dirPath,(err,files)=>{
                if(err){
                    console.log(err)
                }
                files.forEach(file=>{
                    const filtoDelete = path.join(dirPath,file)
                    fs.unlink(filepath,(err)=>{
                        if(err){
                            console.log(err)
                        }
                    })
                    console.log("file deleted");
                    
                });
            });
            
        }
    }
})

}