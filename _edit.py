import sys  
old=sys.argv[2]  
new=sys.argv[3]  
f=open(sys.argv[1],'r',encoding='utf-8')  
c=f.read()  
f.close()  
c=c.replace(old,new)  
f=open(sys.argv[1],'w',encoding='utf-8')  
f.write(c)  
f.close() 
