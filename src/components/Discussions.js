import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Comment,
  Form,
  Input,
  Skeleton,
  Space,
  Tag,
} from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSession } from "next-auth/react";
import { useState } from "react";
import documents from "../services/documents";

dayjs.extend(relativeTime);

const { TextArea } = Input;

const DiscussionsComment = ({
  documentId,
  comment,
  avatarUrl,
  postCurrentComment,
  loading,
}) => {
  return (
    <DiscussionsComments
      avatarUrl={avatarUrl}
      comments={comment.children}
      postCurrentComment={postCurrentComment}
      documentId={documentId}
      loading={loading}
    />
  );
};

const DiscussionsComments = ({
  comments,
  currentUserAvatar,
  documentId,
  postCurrentComment,
  loading,
}) => {
  const [id, setId] = useState(null);
  const [text, setText] = useState("");

  const handleOnShow = (id) => {
    setId(id);
  };

  return (
    <>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          datetime={<p>{dayjs(comment.created_at).fromNow()}</p>}
          actions={[
            <span
              key="comment-nested-reply-to"
              onClick={() => {
                handleOnShow(comment.id);
              }}
            >
              Reply
            </span>,
          ]}
          author={
            <Space>
              <span>{comment?.name}</span>
              {comment?.is_owner && <Tag color="green">owner</Tag>}
            </Space>
          }
          avatar={<Avatar src={comment?.profile_picture} alt="Han Solo" />}
          content={<p>{comment.message}</p>}
        >
          {id === comment.id && (
            <Comment
              avatar={<Avatar src={currentUserAvatar} />}
              content={
                <Editor
                  value={text}
                  submitting={loading}
                  onSubmit={async () => {
                    const data = {
                      parent_id: id,
                      message: text,
                      documentId,
                    };
                    if (!text) {
                      return;
                    } else {
                      await postCurrentComment(data);
                      setText("");
                    }
                  }}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  onCancel={() => {
                    setId(null);
                    setText("");
                  }}
                />
              }
            />
          )}
          <DiscussionsComment
            postCurrentComment={postCurrentComment}
            comment={comment}
            documentId={documentId}
          />
        </Comment>
      ))}
    </>
  );
};

const Editor = ({ main, onChange, onSubmit, submitting, value, onCancel }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Space>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          Tambahkan komentar
        </Button>
        {!main && <Button onClick={onCancel}>Cancel</Button>}
      </Space>
    </Form.Item>
  </div>
);

const Discussions = ({ documentId }) => {
  const [message, setMessage] = useState("");
  const { data: user } = useSession();
  const { data, isLoading } = useQuery(["discussions", documentId], () =>
    documents.fetchDiscussions(documentId)
  );

  const queryClient = useQueryClient();

  const discussionsMutation = useMutation(
    (newDiscussion) => {
      return documents.createDiscussions(documentId, newDiscussion);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("discussions");
        setMessage("");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleSubmit = async () => {
    const data = { message, parent_id: null, document_id: documentId };
    if (!message) {
      return;
    }
    await discussionsMutation.mutateAsync(data);
  };

  const postCurrentComment = async (data) => {
    await discussionsMutation.mutateAsync(data);
  };

  const handleChange = (e) => setMessage(e.target.value);

  return (
    <Skeleton loading={isLoading} active>
      <Comment
        avatar={user?.user?.image}
        content={
          <Editor
            value={message}
            submitting={discussionsMutation.isLoading}
            main
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        }
      ></Comment>
      <DiscussionsComments
        documentId={documentId}
        comments={data?.data}
        currentUserAvatar={user?.user?.image}
        postCurrentComment={postCurrentComment}
        loading={discussionsMutation.isLoading}
      />
    </Skeleton>
  );
};

export default Discussions;
