import { createContextFactory } from "@/lib/context-factory/create-context-factory";

export const {
    useSearchInputContext,
    SearchInputContextProvider
} = createContextFactory({
    name: "SearchInput",
    useInitializer: (props: {
        isExpanded: boolean
    }) => props,
})