import * as React from "react";
import { VerifiableCredential } from "@veramo/core";

export const Kudos = ({ credential } : { credential: VerifiableCredential }) => {

  const openUrl = (url: string) => {
    window.location.href = url
  }

  return <div className="credential__kudos">
    <div className="credential__kudos_content">
      <div>
        <div className="credential__kudos_title">
          <span className="credential__kudos_emoji">🏆</span> Kudos to <span 
            onClick={() => {openUrl(credential.credentialSubject.id as string)}} 
            className="veramo__pointer">{credential.credentialSubject.name}</span>
        </div>
        <div className="credential__kudos_kudos">
          {credential.credentialSubject.kudos}
        </div>
      </div>
      <a href={credential.credentialSubject.id} ><img src={credential.credentialSubject.avatar} className='credential__kudos_avatar' /></a>
    </div>
    <div className="credential__kudos_footer">
      <img 
        className="credential__kudos_author_avatar veramo__pointer"
        src={credential.credentialSubject.authorAvatar} 
        onClick={()=>openUrl(credential.credentialSubject.authorId)}
        />
      <span 
        className="credential__kudos_author_name veramo__pointer"
        onClick={()=>openUrl(credential.credentialSubject.authorId)}
        >{credential.credentialSubject.authorName}</span>

      <span 
        className="veramo__pointer"
        onClick={() => openUrl(
          `https://discord.com/channels/${credential.credentialSubject.guildId}/${credential.credentialSubject.channelId}/${credential.id}`
        )}>

        <span className="credential__kudos_footer_spacer">・</span>
        {credential.credentialSubject.channelName}
        <span className="credential__kudos_footer_spacer">・</span>
        <img className="credential__kudos_guild_avatar" src={credential.credentialSubject.guildAvatar} />
        {credential.credentialSubject.guildName}
      </span>
    </div>
  </div>;
};
