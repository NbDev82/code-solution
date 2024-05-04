import { Image } from '@chakra-ui/react';
import { Button, Box, Textarea, Checkbox, Flex, Icon, Text } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';

function BlogComment() {
  return (
    <div class="root__3XxC">
      <Box className="header-container">
        <Flex className="comment-count">
          <Icon as={ChatIcon} viewBox="0 0 24 24" width="1em" height="1em" className="icon chat-icon" />
          <Text ml="2">Comments: 1</Text>
        </Flex>
        <Flex className="sorts">
          <Flex className="radio-wrapper">
            <label className="radio-label">
              <Checkbox className="radio-input" defaultIsChecked>
                Best
              </Checkbox>
            </label>
            <label className="radio-label">
              <Checkbox className="radio-input">Most Votes</Checkbox>
            </label>
            <label className="radio-label">
              <Checkbox className="radio-input"></Checkbox>
              Newest to Oldest
            </label>
            <label className="radio-label">
              <Checkbox className="radio-input"></Checkbox>
              Oldest to Newest
            </label>
          </Flex>
        </Flex>
      </Box>
      <div class="comments-container__tcjS">
        <Box className="comment" data-is-show="true">
          <Box className="editor">
            <Box className="container input-area">
              <Box className="follower-layer text-area">
                <span className="cursor-position">
                  <Box className="follower-container">
                    <Box className="follower-container"></Box>
                  </Box>
                </span>
              </Box>
              <Box>
                <Box></Box>
              </Box>
              <Textarea className="text-area" placeholder="Type comment here... (Markdown is supported)" rows="1" />
            </Box>

            <Box className="action-area">
              <Box className="left-actions">
                <Button className="btn btn-sm btn-info button preview" data-no-border="false" data-is-hide="true">
                  <Box className="btn-content-container">
                    <span className="btn-content">Preview</span>
                  </Box>
                </Button>
              </Box>
              <Button className="btn fancy-btn primary light btn-sm button" disabled="" data-no-border="true">
                <Box className="btn-content-container">
                  <span className="btn-content">Post</span>
                </Box>
              </Button>
            </Box>
          </Box>
        </Box>
        <div class="comments-list__vX16">
          <Box className="loading-cover" data-status="exited">
            <Box className="wrapper" data-theme="light" data-label-position="right">
              <Box className="loading">
                <Box title="" role="button" aria-label="animation" tabIndex="0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 200 200"
                    width="200"
                    height="200"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <defs>
                      <clipPath id="animationMask">
                        <rect width="200" height="200" x="0" y="0"></rect>
                      </clipPath>
                    </defs>
                    <g clipPath="url(#animationMask)">
                      <g>
                        <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fillOpacity="0"
                            stroke="rgb(153,153,153)"
                            strokeOpacity="1"
                            strokeWidth="16"
                            d="M0 0"
                          ></path>
                        </g>
                      </g>
                      <g>
                        <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fillOpacity="0"
                            stroke="rgb(153,153,153)"
                            strokeOpacity="1"
                            strokeWidth="16"
                            d="M0 0"
                          ></path>
                        </g>
                      </g>
                      <g>
                        <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fillOpacity="0"
                            stroke="rgb(153,153,153)"
                            strokeOpacity="1"
                            strokeWidth="16"
                            d="M31.819000244140625,40.31999969482422 C31.819000244140625,40.31999969482422 17.923999786376953,54.17100143432617 17.923999786376953,54.17100143432617 C17.656999588012695,54.4370002746582 17.385000228881836,54.69599914550781 17.108999252319336,54.948001861572266"
                          ></path>
                        </g>
                      </g>
                      <g
                        transform="matrix(0.7313229441642761,0.6820313930511475,-0.6820313930511475,0.7313229441642761,111.45152282714844,103.29383087158203)"
                        opacity="1"
                      >
                        <g opacity="1" transform="matrix(1,0,0,1,-3.25600004196167,13.298999786376953)">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fillOpacity="0"
                            stroke="rgb(153,153,153)"
                            strokeOpacity="1"
                            strokeWidth="16"
                            d="M26.32699966430664,-36.237998962402344 C37.518001556396484,-28.090999603271484 44.797000885009766,-14.887999534606934 44.797000885009766,0 C44.797000885009766,24.723464965820312 24.723464965820312,44.797000885009766 0,44.797000885009766 C-10.036999702453613,44.797000885009766 -19.308000564575195,41.48899841308594 -26.780000686645508,35.90399932861328"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </Box>
              </Box>
            </Box>
          </Box>
          {/* <div class="comment__3raU" data-comment-id="2381490" data-indentation-level="0">
            <div class="root__3bcS">
              <a href="/zppl" target="_blank">
                <img
                  alt="zppl's avatar"
                  class="avatar__7D9c"
                  src="https://assets.leetcode.com/users/avatars/avatar_1666959405.png"
                ></img>
              </a>
              <div>
                <div>
                  <div class="user-info__2b-x">
                    <span class="name__2jm2">
                      <a href="/zppl" target="_blank" class="link__Lpjq">
                        zppl
                      </a>
                    </span>
                    <img
                      src="https://assets.leetcode.com/static_assets/others/DS_II.png"
                      class="badge__2d0z css-haohx7"
                    ></img>
                    <span class="reputation___jPr">
                      <svg viewBox="0 0 24 24" width="1em" height="1em" class="icon__1Md2">
                        <path
                          fill-rule="evenodd"
                          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                        ></path>
                      </svg>
                      171
                    </span>
                  </div>
                  <div class="post-info__1K06">
                    <p>6 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="content__2Xc9" data-is-show-read-more="true">
              <div class="markdown-content-area__33i4">
                <div class="read-more__3UuG">Read More</div>
                <div class="discuss-markdown-container">
                  <p>What is ur code for 2</p>
                </div>
                <div class="erd_scroll_detection_container erd_scroll_detection_container_animation_active">
                  <div dir="ltr" class="erd_scroll_detection_container">
                    <div class="erd_scroll_detection_container">
                      <div>
                        <div></div>
                      </div>
                      <div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="actions__32FD">
                <div class="container__3-ij">
                  <div title="Upvote" class="vote__3Zp9 vote__1Qs-" data-is-voted="true">
                    <svg viewBox="0 0 24 24" width="1em" height="1em" class="icon__1Md2">
                      <path fill-rule="evenodd" d="M7 14l5-5 5 5z"></path>
                    </svg>
                  </div>
                  <div title="Vote count" class="count__I8pP count__7rrc">
                    <span>1</span>
                  </div>
                  <div title="Downvote" class="vote__3Zp9 vote__1Qs-" data-is-voted="false">
                    <svg viewBox="0 0 24 24" width="1em" height="1em" class="icon__1Md2">
                      <path fill-rule="evenodd" d="M7 10l5 5 5-5z"></path>
                    </svg>
                  </div>
                </div>
                <div class="action__1C-I">
                  <svg viewBox="0 0 24 24" width="1em" height="1em" class="icon__1Md2">
                    <path
                      fill-rule="evenodd"
                      d="M8.995 22a.955.955 0 0 1-.704-.282.955.955 0 0 1-.282-.704V18.01H3.972c-.564 0-1.033-.195-1.409-.586A1.99 1.99 0 0 1 2 15.99V3.97c0-.563.188-1.032.563-1.408C2.94 2.188 3.408 2 3.972 2h16.056c.564 0 1.033.188 1.409.563.375.376.563.845.563 1.409V15.99a1.99 1.99 0 0 1-.563 1.432c-.376.39-.845.586-1.409.586h-6.103l-3.709 3.71c-.22.187-.454.281-.704.281h-.517zm.986-6.01v3.1l3.099-3.1h6.948V3.973H3.972V15.99h6.01zm-3.99-9.013h12.018v2.018H5.991V6.977zm0 4.037h9.014v1.972H5.99v-1.972z"
                    ></path>
                  </svg>
                  <span>Hide 1 reply</span>
                </div>
                <div class="action__1C-I">
                  <svg viewBox="0 0 24 24" width="1em" height="1em" class="icon__1Md2">
                    <path
                      fill-rule="evenodd"
                      d="M21.947 18.144a1 1 0 0 1-1.496 1.18c-3.255-2.193-5.734-3.275-8.556-3.477v4.134a1 1 0 0 1-1.688.726L2.312 13.22a1 1 0 0 1 0-1.451l7.894-7.494A1 1 0 0 1 11.895 5v3.953c3.62.481 7.937 3.52 10.052 9.191zm-6.992-5.851c-1.624-.938-3.31-1.407-5.06-1.407V7.287l-5.422 5.207 5.422 5.203v-3.885c2.696 0 5.644.763 8.843 2.29-1.002-1.52-2.346-2.979-3.783-3.81z"
                    ></path>
                  </svg>
                  <span>Reply</span>
                </div>
                <div class="action__1C-I" data-show-on-hover="true">
                  <svg viewBox="0 0 24 24" width="1em" height="1em" class="icon__1Md2">
                    <path
                      fill-rule="evenodd"
                      d="M17 5V2l5 5h-9a2 2 0 0 0-2 2v8H9V9a4 4 0 0 1 4-4h4zm3 14V9h2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3v2H4v14h16z"
                    ></path>
                  </svg>
                  <span>Share</span>
                </div>
                <div data-show-on-hover="true" class="action__1C-I">
                  <svg viewBox="0 0 24 24" width="1em" height="1em" class="icon__1Md2">
                    <path
                      fill-rule="evenodd"
                      d="M1 22L12 2l11 20H1zm18.617-2L12 6.15 4.383 20h15.234zM13 19h-2v-2h2v2zm0-3h-2v-5h2v5z"
                    ></path>
                  </svg>
                  <span>Report</span>
                </div>
              </div>
            </div>
          </div>
          <div class="comment__3raU" data-comment-id="2381493" data-indentation-level="1">
            <div class="root__3bcS">
              <img
                src="https://assets.leetcode.com/users/default_avatar.jpg"
                alt="Anonymous User"
                class="avatar__7D9c anonymous-avatar__2wS_"
              ></img>

              <div>
                <div>
                  <div class="user-info__2b-x">
                    <span class="name__2jm2">Anonymous User</span>
                  </div>
                  <div class="post-info__1K06">
                    <p>6 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="content__2Xc9" data-is-show-read-more="true">
              <div class="markdown-content-area__33i4" data-is-beyond-limit-size="false">
                <div class="read-more__3UuG">Read More</div>
                <div class="discuss-markdown-container">
                  <p>
                    Put both the array in different hashset and return hashset count if it is less than n/2 else return
                    n / 2;
                  </p>
                </div>
                <div class="erd_scroll_detection_container erd_scroll_detection_container_animation_active">
                  <div dir="ltr" class="erd_scroll_detection_container">
                    <div class="erd_scroll_detection_container">
                      <div>
                        <div></div>
                      </div>
                      <div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="actions__32FD">
                <div class="container__3-ij">
                  <div title="Upvote" class="vote__3Zp9 vote__1Qs-" data-is-voted="false">
                    <svg viewBox="0 0 24 24" width="1em" height="1em" class="icon__1Md2">
                      <path fill-rule="evenodd" d="M7 14l5-5 5 5z"></path>
                    </svg>
                  </div>
                  <div title="Vote count" class="count__I8pP count__7rrc">
                    <span>0</span>
                  </div>
                  <div title="Downvote" class="vote__3Zp9 vote__1Qs-" data-is-voted="false">
                    <svg viewBox="0 0 24 24" width="1em" height="1em" class="icon__1Md2">
                      <path fill-rule="evenodd" d="M7 10l5 5 5-5z"></path>
                    </svg>
                  </div>
                </div>
                <div class="action__1C-I">
                  <svg viewBox="0 0 24 24" width="1em" height="1em" class="icon__1Md2">
                    <path
                      fill-rule="evenodd"
                      d="M21.947 18.144a1 1 0 0 1-1.496 1.18c-3.255-2.193-5.734-3.275-8.556-3.477v4.134a1 1 0 0 1-1.688.726L2.312 13.22a1 1 0 0 1 0-1.451l7.894-7.494A1 1 0 0 1 11.895 5v3.953c3.62.481 7.937 3.52 10.052 9.191zm-6.992-5.851c-1.624-.938-3.31-1.407-5.06-1.407V7.287l-5.422 5.207 5.422 5.203v-3.885c2.696 0 5.644.763 8.843 2.29-1.002-1.52-2.346-2.979-3.783-3.81z"
                    ></path>
                  </svg>
                  <span>Reply</span>
                </div>
                <div class="action__1C-I" data-show-on-hover="true">
                  <svg viewBox="0 0 24 24" width="1em" height="1em" class="icon__1Md2">
                    <path
                      fill-rule="evenodd"
                      d="M17 5V2l5 5h-9a2 2 0 0 0-2 2v8H9V9a4 4 0 0 1 4-4h4zm3 14V9h2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3v2H4v14h16z"
                    ></path>
                  </svg>
                  <span>Share</span>
                </div>
                <div data-show-on-hover="true" class="action__1C-I">
                  <svg viewBox="0 0 24 24" width="1em" height="1em" class="icon__1Md2">
                    <path
                      fill-rule="evenodd"
                      d="M1 22L12 2l11 20H1zm18.617-2L12 6.15 4.383 20h15.234zM13 19h-2v-2h2v2zm0-3h-2v-5h2v5z"
                    ></path>
                  </svg>
                  <span>Report</span>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div class="pagination-container__px42 hidden-pagination-container__5I8a">
        <div class="root__1bde"></div>
      </div>
    </div>
  );
}
export default BlogComment;
