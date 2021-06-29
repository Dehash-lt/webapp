import './LoadingBall.css';
import React from 'react'


export class Ball extends React.Component<any>{
  render(){
    return (
      <div className="ballWrapper">
         <div className="ballBouncer" style={{marginLeft:this.props.marginLeft,animation:this.props.animation,animationDelay:this.props.animationDelay}} 
          onAnimationEnd={()=>{
            if(this.props.animationEnd){
              this.props.animationEnd();}
            }}>
            <div className="ball" ></div>
          </div>
      </div>
    )
  }
}

export var LoadingAnimation = (props:any)=>{
  return(
      <div className="overflow">
          <Ball marginLeft={'-15vh'} animationDelay={'0s'} animation={'bounce linear 1.5s '+props.repeat+' forwards'}/>
          <Ball marginLeft={'-5vh'} animationDelay={'0.2s'}animation={'bounce linear 1.5s '+props.repeat+' forwards'}/>
          <Ball marginLeft={'5vh'} animationDelay={'0.4s'} animation={'bounce linear 1.5s '+props.repeat+' forwards'}
          animationEnd={props.animationEnd}
          />
      </div>
  )
}
export default LoadingAnimation;
