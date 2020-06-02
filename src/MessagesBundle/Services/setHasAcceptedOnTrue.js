export function setHasAcceptedOnTrue(user, room) {
  return user.social.roomIds.map((roomId) => {
    if (roomId.id === room?.id) {
      return {
        ...roomId,
        hasAccepted: true
      }
    }
    return roomId;
  })
};
