r=open('assets/css/main.css','r',encoding='utf-8').read()
r=r.replace('.skill-pill {','.project-card {\n    @apply card card-hover overflow-hidden;\n  }\n\n  .skill-pill {')
open('assets/css/main.css','w',encoding='utf-8').write(r)