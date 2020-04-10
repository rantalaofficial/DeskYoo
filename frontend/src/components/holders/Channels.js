import React from 'react'
import ChannelBox from '../boxes/ChannelBox'

const Channels = ({channels, st}) => {
    if(channels){
      return(
        <div>
          {channels.map((channel, i) =>
            <ChannelBox key={i}
            id={i} 
            name={channel.name} 
            followers={channel.followers}
            st={st}
            />
          )}
        </div>
      )
    }
    else{
      return(
        <div>
  
        </div>
      )
    }
  }

export default Channels