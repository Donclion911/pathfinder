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
function _crossCheck(around)
{	
	if(around==undefined)
	{
		openPostions=[];
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
		shortpath=(temp.height)*(temp.width);
		nextPostion=new position(stepX,stepY);
		openPostions.forEach(function(next){
			if(((temp.height)*(temp.width))-((next.y)*(next.x))<shortpath)
			{
				shortpath=((temp.height)*(temp.width))-((next.y)*(next.x));
				nextPostion=new position(next.x,next.y);
			}
		});
		stepX=nextPostion.x;stepY=nextPostion.y;
		blocks[stepX][stepY].pass=true;
	}
	else
	{
		if(around.x>=0 && around.y>=0?blocks[around.x][around.y].type!=1&&
		   !blocks[around.x][around.y].pass:false)
		{
			openPostions.push(new position(around.x,around.y));
			blocks[around.x][around.y].check=true;
		}
	}
}
function _trackPath()
{
	console.log(`${stepX},${stepY}`);
	if(stepX<blocks.length)
	{
		if(blocks[stepX][stepY]!=undefined &&
		  (stepX<blocks.length-1&&stepY<blocks[0].length-1))
		{
			if(blocks[stepX][stepY].type!=1 
				&& (blocks[stepX+1][stepY].type!=1||blocks[stepX][stepY+1].type!=1))
			{
				blocks[stepX][stepY].pass=true;
				stepX+=moveX;stepY+=moveY;
				past=true;
			}
			else
			{
				if(past)
				{
					stepX-=moveX;stepY-=moveY;
				}
				past=false;
				_crossCheck();
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
					tempX.push(new block(i,l,Math.round(Math.random()*(3-1)+1)));
				}
			}
			blocks.push(tempX);
			tempX=[];
		}
	}
	_trackPath();
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
				x.fillStyle="rgba(149, 165, 166,0.5)";
				if(blocks[i][l].check)
				{
					x.fillStyle="rgba(127, 140, 141,1.0)";
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