import React from 'react'
import ChannelBox from '../boxes/ChannelBox'
import OpenedChannelBox from '../boxes/OpenedChannelBox'

const OpenedChannels = ({channels, st, ct, openedChannel}) => {
    if(channels){
      return(
        <div>
          {channels.map((channel, i) => i!==openedChannel ?
            <ChannelBox key={i}
            id={i} 
            name={channel.name} 
            followers={channel.followers}
            st={st}
            />
            :
            <OpenedChannelBox key={i}
            id={i} 
            name={channel.name} 
            followers={channel.followers}
            ct={ct}
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

export default OpenedChannels