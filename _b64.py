import base64,sys  
open(sys.argv[1],'w',encoding='utf-8').write(base64.b64decode(sys.argv[2]).decode()) 
