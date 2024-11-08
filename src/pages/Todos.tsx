import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "providers/AuthProvider";
import { SetStateAction, useCallback, useState } from "react";
import { useFetcher } from "hooks/useFetcher";
import { Button, TextField, TextareaAutosize } from "@mui/material";
import { TodoRow } from "components/TodoRow";

const useTodos = (fetcher: () => Promise<any>) => {
    return useQuery({
        queryKey: ['get', 'todos'],
        queryFn: () => fetcher(),
    })
}

export const Todos = () => {

    const fetcher = useFetcher('/todos', 'GET');

    const { data, error, isLoading } = useTodos(fetcher);

    if (isLoading || !data) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <AddTodo />
            {
                data.data
                && data.data.map((todo: any, index: number) =>
                    <TodoRow key={todo.id} todo={todo} />)
            }
        </>
    );
}

const AddTodo = () => {
    const { userData } = useAuth();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');


    const fetcher = useFetcher('/todos', "POST");
    const queryClient = useQueryClient();

    // useMutation 훅을 사용하여 POST 요청을 처리
    const mutation = useMutation({
        mutationFn: (value) => {
            return fetcher(value)
        },
        onSuccess: () => {
            // 성공적으로 추가된 후, todos 쿼리를 다시 가져와서 최신 상태로 유지
            queryClient.invalidateQueries(['get', '/todos', userData.token ?? '']);
        },
        onError: (e) => {
            console.error(e);
        }
    }, queryClient);

    const handleAddTodo = useCallback(() => {
        mutation.mutate({ title, content }); // fetcher에 제공할 parameter를 직접 전달
        setTitle('');
        setContent('');
    }, [mutation, title, content]);

    return <div
        style={{
            display: 'flex',
            justifyContent: "space-between",
            alignItems: "center",
            margin: "8px 12px",
            gap: '20px'
        }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: "column", gap: '10px' }}>
            <TextField
                id="new-todo-title"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextareaAutosize
                id="new-todo-content"
                title="Content"
                value={content}
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setContent(e.target.value)}
                minRows={3}
            />
        </div>
        <Button style={{ flexShrink: 0 }} color="primary" size='large' title="Add Todo" onClick={handleAddTodo} >Add Todo</Button>
    </div>
}
