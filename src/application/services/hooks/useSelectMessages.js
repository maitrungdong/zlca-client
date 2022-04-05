import { useDispatch, useSelector } from 'react-redux'
import { currentConverActions } from 'infrastructure/store/slices/currentConverSlice'

const useSelectMessages = (conver) => {
  const dispatch = useDispatch()

  const currentConverId = useSelector((state) => state.currentConver.id)

  let messages = []
  messages = useSelector((state) => state.currentConver.messages)
  if (conver?.id !== currentConverId) {
    dispatch(currentConverActions.fetchAllMessages(conver))
  }

  return messages
}

export default useSelectMessages
