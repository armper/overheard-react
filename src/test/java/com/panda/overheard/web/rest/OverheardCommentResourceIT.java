package com.panda.overheard.web.rest;

import com.panda.overheard.OverheardReactApp;
import com.panda.overheard.config.TestSecurityConfiguration;
import com.panda.overheard.domain.OverheardComment;
import com.panda.overheard.domain.User;
import com.panda.overheard.domain.Post;
import com.panda.overheard.repository.OverheardCommentRepository;
import com.panda.overheard.service.OverheardCommentService;

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
 * Integration tests for the {@link OverheardCommentResource} REST controller.
 */
@SpringBootTest(classes = { OverheardReactApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class OverheardCommentResourceIT {

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_RANKING = 1;
    private static final Integer UPDATED_RANKING = 2;

    @Autowired
    private OverheardCommentRepository overheardCommentRepository;

    @Autowired
    private OverheardCommentService overheardCommentService;

    @Autowired
    private MockMvc restOverheardCommentMockMvc;

    private OverheardComment overheardComment;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OverheardComment createEntity() {
        OverheardComment overheardComment = new OverheardComment()
            .content(DEFAULT_CONTENT)
            .date(DEFAULT_DATE)
            .ranking(DEFAULT_RANKING);
        // Add required entity
        User user = UserResourceIT.createEntity();
        user.setId("fixed-id-for-tests");
        overheardComment.setUser(user);
        // Add required entity
        Post post;
        post = PostResourceIT.createEntity();
        post.setId("fixed-id-for-tests");
        overheardComment.setPost(post);
        return overheardComment;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OverheardComment createUpdatedEntity() {
        OverheardComment overheardComment = new OverheardComment()
            .content(UPDATED_CONTENT)
            .date(UPDATED_DATE)
            .ranking(UPDATED_RANKING);
        // Add required entity
        User user = UserResourceIT.createEntity();
        user.setId("fixed-id-for-tests");
        overheardComment.setUser(user);
        // Add required entity
        Post post;
        post = PostResourceIT.createUpdatedEntity();
        post.setId("fixed-id-for-tests");
        overheardComment.setPost(post);
        return overheardComment;
    }

    @BeforeEach
    public void initTest() {
        overheardCommentRepository.deleteAll();
        overheardComment = createEntity();
    }

    @Test
    public void createOverheardComment() throws Exception {
        int databaseSizeBeforeCreate = overheardCommentRepository.findAll().size();
        // Create the OverheardComment
        restOverheardCommentMockMvc.perform(post("/api/overheard-comments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(overheardComment)))
            .andExpect(status().isCreated());

        // Validate the OverheardComment in the database
        List<OverheardComment> overheardCommentList = overheardCommentRepository.findAll();
        assertThat(overheardCommentList).hasSize(databaseSizeBeforeCreate + 1);
        OverheardComment testOverheardComment = overheardCommentList.get(overheardCommentList.size() - 1);
        assertThat(testOverheardComment.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testOverheardComment.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testOverheardComment.getRanking()).isEqualTo(DEFAULT_RANKING);
    }

    @Test
    public void createOverheardCommentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = overheardCommentRepository.findAll().size();

        // Create the OverheardComment with an existing ID
        overheardComment.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restOverheardCommentMockMvc.perform(post("/api/overheard-comments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(overheardComment)))
            .andExpect(status().isBadRequest());

        // Validate the OverheardComment in the database
        List<OverheardComment> overheardCommentList = overheardCommentRepository.findAll();
        assertThat(overheardCommentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkContentIsRequired() throws Exception {
        int databaseSizeBeforeTest = overheardCommentRepository.findAll().size();
        // set the field null
        overheardComment.setContent(null);

        // Create the OverheardComment, which fails.


        restOverheardCommentMockMvc.perform(post("/api/overheard-comments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(overheardComment)))
            .andExpect(status().isBadRequest());

        List<OverheardComment> overheardCommentList = overheardCommentRepository.findAll();
        assertThat(overheardCommentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = overheardCommentRepository.findAll().size();
        // set the field null
        overheardComment.setDate(null);

        // Create the OverheardComment, which fails.


        restOverheardCommentMockMvc.perform(post("/api/overheard-comments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(overheardComment)))
            .andExpect(status().isBadRequest());

        List<OverheardComment> overheardCommentList = overheardCommentRepository.findAll();
        assertThat(overheardCommentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllOverheardComments() throws Exception {
        // Initialize the database
        overheardCommentRepository.save(overheardComment);

        // Get all the overheardCommentList
        restOverheardCommentMockMvc.perform(get("/api/overheard-comments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(overheardComment.getId())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].ranking").value(hasItem(DEFAULT_RANKING)));
    }
    
    @Test
    public void getOverheardComment() throws Exception {
        // Initialize the database
        overheardCommentRepository.save(overheardComment);

        // Get the overheardComment
        restOverheardCommentMockMvc.perform(get("/api/overheard-comments/{id}", overheardComment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(overheardComment.getId()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.ranking").value(DEFAULT_RANKING));
    }
    @Test
    public void getNonExistingOverheardComment() throws Exception {
        // Get the overheardComment
        restOverheardCommentMockMvc.perform(get("/api/overheard-comments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateOverheardComment() throws Exception {
        // Initialize the database
        overheardCommentService.save(overheardComment);

        int databaseSizeBeforeUpdate = overheardCommentRepository.findAll().size();

        // Update the overheardComment
        OverheardComment updatedOverheardComment = overheardCommentRepository.findById(overheardComment.getId()).get();
        updatedOverheardComment
            .content(UPDATED_CONTENT)
            .date(UPDATED_DATE)
            .ranking(UPDATED_RANKING);

        restOverheardCommentMockMvc.perform(put("/api/overheard-comments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedOverheardComment)))
            .andExpect(status().isOk());

        // Validate the OverheardComment in the database
        List<OverheardComment> overheardCommentList = overheardCommentRepository.findAll();
        assertThat(overheardCommentList).hasSize(databaseSizeBeforeUpdate);
        OverheardComment testOverheardComment = overheardCommentList.get(overheardCommentList.size() - 1);
        assertThat(testOverheardComment.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testOverheardComment.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testOverheardComment.getRanking()).isEqualTo(UPDATED_RANKING);
    }

    @Test
    public void updateNonExistingOverheardComment() throws Exception {
        int databaseSizeBeforeUpdate = overheardCommentRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOverheardCommentMockMvc.perform(put("/api/overheard-comments").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(overheardComment)))
            .andExpect(status().isBadRequest());

        // Validate the OverheardComment in the database
        List<OverheardComment> overheardCommentList = overheardCommentRepository.findAll();
        assertThat(overheardCommentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteOverheardComment() throws Exception {
        // Initialize the database
        overheardCommentService.save(overheardComment);

        int databaseSizeBeforeDelete = overheardCommentRepository.findAll().size();

        // Delete the overheardComment
        restOverheardCommentMockMvc.perform(delete("/api/overheard-comments/{id}", overheardComment.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OverheardComment> overheardCommentList = overheardCommentRepository.findAll();
        assertThat(overheardCommentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
