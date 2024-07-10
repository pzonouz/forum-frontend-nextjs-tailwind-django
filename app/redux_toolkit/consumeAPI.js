import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/api/v1/",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  }),
  tagTypes: ["score_question", "score_answer", "question", "answer", "user"],
  endpoints(builder) {
    return {
      viewUpQuestion: builder.query({
        query(id) {
          return `questions/${id}/view_up`;
        },
        invalidatesTags: ["question", "answer"],
      }),
      makeAnswerSolved: builder.mutation({
        query: (id) => ({
          url: `answers/${id}/solved`,
          method: "POST",
        }),
        invalidatesTags: ["answer", "question"],
      }),
      createAnswer: builder.mutation({
        query: ({ questionId, ...question }) => ({
          url: `question/${questionId}/answers/`,
          method: "POST",
          body: question,
        }),
        invalidatesTags: ["answer", "question"],
      }),
      fetchAnswersOfUser: builder.query({
        query() {
          return `answers/current_user`;
        },
        providesTags: ["question", "answer"],
      }),
      fetchAnswersOfQuestion: builder.query({
        query(
          questionId,
          limit = 100,
          orderBy = "created_at",
          orderDirection = "DESC",
        ) {
          return `answers/${questionId}/?limit=${limit}&sort_by=${orderBy}&sort_direction=${orderDirection}`;
        },
        providesTags: ["answer"],
      }),
      fetchQuestion: builder.query({
        query(id) {
          return `questions/${id}`;
        },
        providesTags: ["question"],
      }),
      fetchAnswer: builder.query({
        query(id) {
          return `answers/${id}`;
        },
        providesTags: ["answer"],
      }),
      fetchQuestions: builder.query({
        query(args) {
          return `questions/?limit=${args?.limit ? args?.limit : 100}&order_by=${args?.orderBy ? args?.orderBy : "created_at"}&order_direction=${args?.orderDirection ? args?.orderDirection : ""}&search_field=${args?.searchField ? args?.searchField : ""}&search_field_value=${args?.searchFieldValue ? args?.searchFieldValue : ""}`;
        },
        providesTags: ["question"],
      }),
      fetchQuestion: builder.query({
        query(id) {
          return `questions/${id}`;
        },
        providesTags: ["question"],
      }),
      fetchQuestionsOfUser: builder.query({
        query() {
          return `questions/current_user`;
        },
        providesTags: ["question"],
      }),
      createQuestion: builder.mutation({
        query: ({ ...question }) => ({
          url: `questions/`,
          method: "POST",
          body: question,
        }),
        invalidatesTags: ["question"],
      }),
      editQuestion: builder.mutation({
        query: ({ id, ...question }) => ({
          url: `questions/${id}/`,
          method: "PATCH",
          body: question,
        }),
        invalidatesTags: ["question"],
      }),
      deleteQuestion: builder.mutation({
        query: (id) => ({
          url: `questions/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["question"],
      }),
      editAnswer: builder.mutation({
        query: ({ id, ...answer }) => ({
          url: `answers/${id}/`,
          method: "PATCH",
          body: answer,
        }),
        invalidatesTags: ["answer", "question"],
      }),
      deleteAnswer: builder.mutation({
        query: (id) => ({
          url: `answers/${id}/`,
          method: "DELETE",
        }),
        invalidatesTags: ["answer", "question"],
      }),
      createScoreQuestion: builder.mutation({
        query: ({ id, ...payload }) => ({
          url: `scores/question/${id}`,
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ["score_question", "question"],
      }),
      fetchScoreQuestion: builder.query({
        query(id) {
          return `scores/question/${id}`;
        },
        providesTags: ["score_question", "question"],
      }),
      createScoreAnswer: builder.mutation({
        query: ({ id, ...payload }) => ({
          url: `scores/answer/${id}`,
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ["score_answer", "answer", "question"],
      }),
      fetchScoreAnswer: builder.query({
        query(id) {
          return `scores/answer/${id}`;
        },
        providesTags: ["score_answer"],
      }),
      registerUser: builder.mutation({
        query: ({ ...user }) => ({
          url: `users/register`,
          method: "POST",
          body: user,
        }),
      }),
      loginUser: builder.mutation({
        query: ({ ...user }) => ({
          url: `login`,
          method: "POST",
          body: user,
        }),
      }),
      editUser: builder.mutation({
        query: ({ ...user }) => ({
          url: `users/`,
          method: "PATCH",
          body: user,
        }),
        invalidatesTags: ["user"],
      }),
      logoutUser: builder.mutation({
        query: () => ({
          url: `logout`,
        }),
      }),
      fetchUser: builder.query({
        query() {
          return `users/`;
        },
        providesTags: ["user"],
      }),
    };
  },
});

export const {
  useViewUpQuestionQuery,
  useFetchQuestionsQuery,
  useFetchQuestionQuery,
  useFetchQuestionsOfUserQuery,
  useFetchAnswerQuery,
  useEditQuestionMutation,
  useCreateQuestionMutation,
  useDeleteQuestionMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useFetchUserQuery,
  useEditUserMutation,
  useCreateScoreQuestionMutation,
  useCreateScoreAnswerMutation,
  useFetchScoreQuestionQuery,
  useFetchScoreAnswerQuery,
  useFetchAnswersOfQuestionQuery,
  useFetchAnswersOfUserQuery,
  useCreateAnswerMutation,
  useMakeAnswerSolvedMutation,
  useEditAnswerMutation,
  useDeleteAnswerMutation,
} = api;
export default api;
