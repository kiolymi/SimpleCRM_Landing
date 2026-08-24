from pathlib import Path
import numpy as np
from PIL import Image

folder=Path(__file__).parent/'simple-crm-landing-screens'
specs={
'20-task-board.png':[(48,558,1122,798),(48,823,1122,1013),(48,1134,1122,1518),(48,1638,1122,1866)],
'21-task-list.png':[(48,720,1122,996),(48,1032,1122,1428)],
'22-task-inbox.png':[(48,696,1122,813),(48,879,1122,1230)],
'23-task-detail.png':[(48,357,1122,741),(48,888,1122,1476)],
'24-create-task.png':[(48,419,1122,601),(48,939,1122,1095)],
}
for name,boxes in specs.items():
    path=folder/name; original=np.array(Image.open(path).convert('RGBA')); result=original.copy()
    for left,top,right,bottom in boxes:
        source=original[top:bottom,left:right,:3]
        result[top:bottom,left:right,:3]=255
        foreground=np.min(source,axis=2)<232
        result[top:bottom,left:right,:3][foreground]=source[foreground]
    Image.fromarray(result,'RGBA').save(path)
    print(name)
