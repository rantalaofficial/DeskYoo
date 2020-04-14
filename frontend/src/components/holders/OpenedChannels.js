import React from 'react'
import ChannelBox from '../boxes/ChannelBox'
import OpenedChannelBox from '../boxes/OpenedChannelBox'

const OpenedChannels = ({channels, st, ct, openedChannel}) => {
    if(channels){
      return(
        <div>
          {channels.map((channel) => channel.id!==openedChannel ?
            <ChannelBox key={channel.id}
            id={channel.id} 
            name={channel.text} 
            followers={channel.followers}
            st={st}
            />
            :
            <OpenedChannelBox key={channel.id}
            id={channel.id} 
            name={channel.text} 
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