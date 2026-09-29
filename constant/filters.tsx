export const BookmarkFilters = [
  { name: "Popular", value: "popular" },
  { name: "Oldest", value: "oldest" },
  { name: "Newest", value: "newest" },
];

export const MessageFilters = [
  { name: "Newest", value: "newest" },
];

export const TagFilters = [
  { name: "Popular", value: "popular" },
  { name: "Recent", value: "recent" },
  { name: "Oldest", value: "oldest" },
  { name: "Name (A–Z)", value: "name" },
];

export const UserFilters=[
    {name: "Newest", value: "newest"},
    {name: "Oldest", value: "oldest"},
    {name: "Popular", value: "popular"},
];

export const CommentFilters=[
    {name: "Latest", value:"latest"},
    {name: "Oldest", value:"oldest"},
]

export const DefaultFilters={
    BookmarkFilters: "newest",
    MessageFilters: "newest",
    TagFilters: "popular",
    UserFilters: "oldest",
    CommentFilters: "latest",
}