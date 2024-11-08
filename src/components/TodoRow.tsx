import { PropsWithChildren, useCallback } from "react"
import styled from "@emotion/styled";
import { Button } from '@mui/material';
import { useFetcher } from "hooks/useFetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "providers/AuthProvider";
import { HttpMethods } from "msw";

type TodoKeys = | "title" | "content" | "id" | "createdAt" | "updatedAt";
type Todo = {
    [key in TodoKeys]: string;
}
type Props = {
    todo: Todo
}
export const TodoRow = (props: PropsWithChildren<Props>) => {
    const {
        todo
    } = props;
    const { userData } = useAuth();
    
    const queryClient = useQueryClient();
    
    const fetcher = useFetcher(`/todos/${todo.id}`, HttpMethods.DELETE);
    
    const mutation = useMutation({
        mutationFn: () => fetcher(),
        onSuccess: () => {
            queryClient.invalidateQueries(['get', 'todos', userData.token ?? ''])
        },
        onError: (e) => {
            console.error(e);
        }
    });
    
    const handleDeleteTodo = useCallback(() => {
        mutation.mutate();
    }, [mutation]);

    return <ListRow>
        <Content key={todo.id}>
            <div style={{ fontSize: '24px' }}>
                {todo.title}
            </div>
            <p>
                {todo.content}
            </p>
        </Content>
        <Icons>
            <Button color="primary" size="large" onClick={handleDeleteTodo}>Delete</Button>
        </Icons>
    </ListRow>
}

const ListRow = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    margin: 8px 12px;
    gap: 12px;
`

const Content = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:start;
    gap:8px;
`

const Icons = styled.div({
    flexShrink: 0,
})