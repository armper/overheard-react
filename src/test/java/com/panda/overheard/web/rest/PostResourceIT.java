package com.panda.overheard.web.rest;

import com.panda.overheard.OverheardReactApp;
import com.panda.overheard.config.TestSecurityConfiguration;
import com.panda.overheard.domain.Post;
import com.panda.overheard.domain.User;
import com.panda.overheard.domain.Topic;
import com.panda.overheard.repository.PostRepository;
import com.panda.overheard.service.PostService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PostResource} REST controller.
 */
@SpringBootTest(classes = { OverheardReactApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class PostResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_RANK_ONE = 1;
    private static final Integer UPDATED_RANK_ONE = 2;

    private static final Integer DEFAULT_RANK_TWO = 1;
    private static final Integer UPDATED_RANK_TWO = 2;

    private static final Integer DEFAULT_RANK_THREE = 1;
    private static final Integer UPDATED_RANK_THREE = 2;

    private static final Integer DEFAULT_RANK_FOUR = 1;
    private static final Integer UPDATED_RANK_FOUR = 2;

    private static final Integer DEFAULT_RANK_FIVE = 1;
    private static final Integer UPDATED_RANK_FIVE = 2;

    private static final Integer DEFAULT_RANK_SIX = 1;
    private static final Integer UPDATED_RANK_SIX = 2;

    private static final Integer DEFAULT_RANK_SEVEN = 1;
    private static final Integer UPDATED_RANK_SEVEN = 2;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostService postService;

    @Autowired
    private MockMvc restPostMockMvc;

    private Post post;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Post createEntity() {
        Post post = new Post()
            .title(DEFAULT_TITLE)
            .content(DEFAULT_CONTENT)
            .date(DEFAULT_DATE)
            .rankOne(DEFAULT_RANK_ONE)
            .rankTwo(DEFAULT_RANK_TWO)
            .rankThree(DEFAULT_RANK_THREE)
            .rankFour(DEFAULT_RANK_FOUR)
            .rankFive(DEFAULT_RANK_FIVE)
            .rankSix(DEFAULT_RANK_SIX)
            .rankSeven(DEFAULT_RANK_SEVEN);
        // Add required entity
        User user = UserResourceIT.createEntity();
        user.setId("fixed-id-for-tests");
        post.setUser(user);
        // Add required entity
        Topic topic;
        topic = TopicResourceIT.createEntity();
        topic.setId("fixed-id-for-tests");
        post.setTopic(topic);
        return post;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Post createUpdatedEntity() {
        Post post = new Post()
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT)
            .date(UPDATED_DATE)
            .rankOne(UPDATED_RANK_ONE)
            .rankTwo(UPDATED_RANK_TWO)
            .rankThree(UPDATED_RANK_THREE)
            .rankFour(UPDATED_RANK_FOUR)
            .rankFive(UPDATED_RANK_FIVE)
            .rankSix(UPDATED_RANK_SIX)
            .rankSeven(UPDATED_RANK_SEVEN);
        // Add required entity
        User user = UserResourceIT.createEntity();
        user.setId("fixed-id-for-tests");
        post.setUser(user);
        // Add required entity
        Topic topic;
        topic = TopicResourceIT.createUpdatedEntity();
        topic.setId("fixed-id-for-tests");
        post.setTopic(topic);
        return post;
    }

    @BeforeEach
    public void initTest() {
        postRepository.deleteAll();
        post = createEntity();
    }

    @Test
    public void createPost() throws Exception {
        int databaseSizeBeforeCreate = postRepository.findAll().size();
        // Create the Post
        restPostMockMvc.perform(post("/api/posts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(post)))
            .andExpect(status().isCreated());

        // Validate the Post in the database
        List<Post> postList = postRepository.findAll();
        assertThat(postList).hasSize(databaseSizeBeforeCreate + 1);
        Post testPost = postList.get(postList.size() - 1);
        assertThat(testPost.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testPost.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testPost.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testPost.getRankOne()).isEqualTo(DEFAULT_RANK_ONE);
        assertThat(testPost.getRankTwo()).isEqualTo(DEFAULT_RANK_TWO);
        assertThat(testPost.getRankThree()).isEqualTo(DEFAULT_RANK_THREE);
        assertThat(testPost.getRankFour()).isEqualTo(DEFAULT_RANK_FOUR);
        assertThat(testPost.getRankFive()).isEqualTo(DEFAULT_RANK_FIVE);
        assertThat(testPost.getRankSix()).isEqualTo(DEFAULT_RANK_SIX);
        assertThat(testPost.getRankSeven()).isEqualTo(DEFAULT_RANK_SEVEN);
    }

    @Test
    public void createPostWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = postRepository.findAll().size();

        // Create the Post with an existing ID
        post.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restPostMockMvc.perform(post("/api/posts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(post)))
            .andExpect(status().isBadRequest());

        // Validate the Post in the database
        List<Post> postList = postRepository.findAll();
        assertThat(postList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = postRepository.findAll().size();
        // set the field null
        post.setTitle(null);

        // Create the Post, which fails.


        restPostMockMvc.perform(post("/api/posts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(post)))
            .andExpect(status().isBadRequest());

        List<Post> postList = postRepository.findAll();
        assertThat(postList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkContentIsRequired() throws Exception {
        int databaseSizeBeforeTest = postRepository.findAll().size();
        // set the field null
        post.setContent(null);

        // Create the Post, which fails.


        restPostMockMvc.perform(post("/api/posts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(post)))
            .andExpect(status().isBadRequest());

        List<Post> postList = postRepository.findAll();
        assertThat(postList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = postRepository.findAll().size();
        // set the field null
        post.setDate(null);

        // Create the Post, which fails.


        restPostMockMvc.perform(post("/api/posts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(post)))
            .andExpect(status().isBadRequest());

        List<Post> postList = postRepository.findAll();
        assertThat(postList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllPosts() throws Exception {
        // Initialize the database
        postRepository.save(post);

        // Get all the postList
        restPostMockMvc.perform(get("/api/posts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(post.getId())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].rankOne").value(hasItem(DEFAULT_RANK_ONE)))
            .andExpect(jsonPath("$.[*].rankTwo").value(hasItem(DEFAULT_RANK_TWO)))
            .andExpect(jsonPath("$.[*].rankThree").value(hasItem(DEFAULT_RANK_THREE)))
            .andExpect(jsonPath("$.[*].rankFour").value(hasItem(DEFAULT_RANK_FOUR)))
            .andExpect(jsonPath("$.[*].rankFive").value(hasItem(DEFAULT_RANK_FIVE)))
            .andExpect(jsonPath("$.[*].rankSix").value(hasItem(DEFAULT_RANK_SIX)))
            .andExpect(jsonPath("$.[*].rankSeven").value(hasItem(DEFAULT_RANK_SEVEN)));
    }
    
    @Test
    public void getPost() throws Exception {
        // Initialize the database
        postRepository.save(post);

        // Get the post
        restPostMockMvc.perform(get("/api/posts/{id}", post.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(post.getId()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.rankOne").value(DEFAULT_RANK_ONE))
            .andExpect(jsonPath("$.rankTwo").value(DEFAULT_RANK_TWO))
            .andExpect(jsonPath("$.rankThree").value(DEFAULT_RANK_THREE))
            .andExpect(jsonPath("$.rankFour").value(DEFAULT_RANK_FOUR))
            .andExpect(jsonPath("$.rankFive").value(DEFAULT_RANK_FIVE))
            .andExpect(jsonPath("$.rankSix").value(DEFAULT_RANK_SIX))
            .andExpect(jsonPath("$.rankSeven").value(DEFAULT_RANK_SEVEN));
    }
    @Test
    public void getNonExistingPost() throws Exception {
        // Get the post
        restPostMockMvc.perform(get("/api/posts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updatePost() throws Exception {
        // Initialize the database
        postService.save(post);

        int databaseSizeBeforeUpdate = postRepository.findAll().size();

        // Update the post
        Post updatedPost = postRepository.findById(post.getId()).get();
        updatedPost
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT)
            .date(UPDATED_DATE)
            .rankOne(UPDATED_RANK_ONE)
            .rankTwo(UPDATED_RANK_TWO)
            .rankThree(UPDATED_RANK_THREE)
            .rankFour(UPDATED_RANK_FOUR)
            .rankFive(UPDATED_RANK_FIVE)
            .rankSix(UPDATED_RANK_SIX)
            .rankSeven(UPDATED_RANK_SEVEN);

        restPostMockMvc.perform(put("/api/posts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPost)))
            .andExpect(status().isOk());

        // Validate the Post in the database
        List<Post> postList = postRepository.findAll();
        assertThat(postList).hasSize(databaseSizeBeforeUpdate);
        Post testPost = postList.get(postList.size() - 1);
        assertThat(testPost.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testPost.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testPost.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testPost.getRankOne()).isEqualTo(UPDATED_RANK_ONE);
        assertThat(testPost.getRankTwo()).isEqualTo(UPDATED_RANK_TWO);
        assertThat(testPost.getRankThree()).isEqualTo(UPDATED_RANK_THREE);
        assertThat(testPost.getRankFour()).isEqualTo(UPDATED_RANK_FOUR);
        assertThat(testPost.getRankFive()).isEqualTo(UPDATED_RANK_FIVE);
        assertThat(testPost.getRankSix()).isEqualTo(UPDATED_RANK_SIX);
        assertThat(testPost.getRankSeven()).isEqualTo(UPDATED_RANK_SEVEN);
    }

    @Test
    public void updateNonExistingPost() throws Exception {
        int databaseSizeBeforeUpdate = postRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPostMockMvc.perform(put("/api/posts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(post)))
            .andExpect(status().isBadRequest());

        // Validate the Post in the database
        List<Post> postList = postRepository.findAll();
        assertThat(postList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deletePost() throws Exception {
        // Initialize the database
        postService.save(post);

        int databaseSizeBeforeDelete = postRepository.findAll().size();

        // Delete the post
        restPostMockMvc.perform(delete("/api/posts/{id}", post.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Post> postList = postRepository.findAll();
        assertThat(postList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
