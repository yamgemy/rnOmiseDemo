import { CardAddFormValues } from "@screens/card-form-screen/constants"
import { UseFormReturn } from "react-hook-form"
import { useDispatch } from "react-redux"
import { postCardInfoAction } from "src/actions/credit-card-actions"
import { useDebouncedCallback } from "use-debounce"

interface UseAddCardProps {
    form: UseFormReturn<CardAddFormValues, any, undefined>
}

export const useAddCard = ({
    form
}: UseAddCardProps) => {

    const dispatch = useDispatch();

    const executeSubmitCardInfo = useDebouncedCallback(() => {
        const values = form.getValues();
        console.log('executeSubmitCardInfo', values)
        dispatch(postCardInfoAction(values) as any)
    }, 500)

    return {
        executeSubmitCardInfo
    }

}