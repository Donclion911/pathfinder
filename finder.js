temp =document.getElementById("path");
x=temp.getContext("2d");
temp.style.backgroundColor="white";
stepX=stepY=0;
moveX=Math.round(temp.width/temp.height);
moveY=Math.round(temp.height/temp.width);
blocks=[];
past=false;
openPostions=[];
setInterval(_fillupMap,0);
block=class block{
  constructor(x,y,type)
  {
  	this.x=x;
  	this.y=y;
    this.hight=50;
    this.width=50;
    this.type=type;
    this.pass=false;
    this.check=false;
  }
}
position=class{
	constructor(x,y)
	{
		this.x=x;
		this.y=y;
	}
}
function _removeBlock()
{
	newArea=
	openPostions.filter(function(next){
		if(!(next.x==stepX&&next.y==stepY))
		{
			return true;
		}
	});
	openPostions=newArea;
}
function _crossCheck(around)
{	
	if(around==undefined)
	{
		//cross postions	
		_crossCheck(new position(stepX+1,stepY));
		_crossCheck(new position(stepX,stepY+1));
		_crossCheck(new position(stepX-1,stepY));
		_crossCheck(new position(stepX,stepY-1));
		//angle postions
		_crossCheck(new position(stepX+1,stepY+1));
		_crossCheck(new position(stepX-1,stepY+1));
		_crossCheck(new position(stepX+1,stepY-1));
		_crossCheck(new position(stepX-1,stepY-1));
		//after get avilible around postion
		_removeBlock();
		shortpath=(temp.height)+(temp.width);
		nextPostion=new position(stepX,stepY);
		openPostions.forEach(function(next){
			if(((temp.height)+(temp.width))-((next.y)+(next.x))<shortpath)
			{
				shortpath=((temp.height)+(temp.width))-((next.y)+(next.x));
				nextPostion=new position(next.x,next.y);
			}
		});
		stepX=nextPostion.x;stepY=nextPostion.y;
		blocks[stepX][stepY].pass=true;
	}
	else
	{
		if(around.x>=0 && around.y>=0&&around.x<blocks.length&&around.y<blocks.length?
		   blocks[around.x][around.y].type!=1&&
		  !blocks[around.x][around.y].pass:false)
		{
			duplicate=
			openPostions.findIndex(function(next){
				return around.x==next.x&&around.y==next.y;
			});
			if(duplicate==-1)
			{
				openPostions.push(new position(around.x,around.y));
				blocks[around.x][around.y].check=true;
			}
		}
	}
}
function _fillupMap()
{
	tempX=[];
	if(blocks.length==0)
	{
		for(i=0;i<=temp.width;i+=10)
		{
			for(l=0;l<=temp.height;l+=10)
			{
				if(i==0)
				{
					tempX.push(new block(i,l,2));
				}
				else
				{
					tempX.push(new block(i,l,Math.round(Math.random()*(2.5-1)+1)));
				}
			}
			blocks.push(tempX);
			tempX=[];
		}
	}
	console.log(`${stepX},${stepY}`);
	_crossCheck();
	for(i=0;i<blocks.length;i++)
	{
		for(l=0;l<blocks[i].length;l++)
		{
			if(blocks[i][l].type==1)
			{
				x.fillStyle="rgba(52, 73, 94,1.0)";
			}
			else
			{
				x.fillStyle="rgba(149, 165, 166,1.0)";
				if(blocks[i][l].check)
				{
					x.fillStyle="rgba(231, 76, 60,0.8)";
				}
				if(blocks[i][l].pass)
				{
					x.fillStyle="rgba(46, 204, 113,1.0)";
				}
			}
			x.fillRect(blocks[i][l].x,blocks[i][l].y,blocks[i][l].width,blocks[i][l].hight);
		}
	}
}