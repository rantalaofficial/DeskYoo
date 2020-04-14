import React from 'react'
import ChannelBox from '../boxes/ChannelBox'

const Channels = ({channels, st}) => {
    if(channels){
      return(
        <div>
          {channels.map((channel) =>
            <ChannelBox key={channel.id}
            id={channel.id} 
            name={channel.text} 
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