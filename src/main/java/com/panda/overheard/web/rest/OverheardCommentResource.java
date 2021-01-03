package com.panda.overheard.web.rest;

import com.panda.overheard.domain.OverheardComment;
import com.panda.overheard.service.OverheardCommentService;
import com.panda.overheard.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.panda.overheard.domain.OverheardComment}.
 */
@RestController
@RequestMapping("/api")
public class OverheardCommentResource {

    private final Logger log = LoggerFactory.getLogger(OverheardCommentResource.class);

    private static final String ENTITY_NAME = "overheardComment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OverheardCommentService overheardCommentService;

    public OverheardCommentResource(OverheardCommentService overheardCommentService) {
        this.overheardCommentService = overheardCommentService;
    }

    /**
     * {@code POST  /overheard-comments} : Create a new overheardComment.
     *
     * @param overheardComment the overheardComment to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new overheardComment, or with status {@code 400 (Bad Request)} if the overheardComment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/overheard-comments")
    public ResponseEntity<OverheardComment> createOverheardComment(@Valid @RequestBody OverheardComment overheardComment) throws URISyntaxException {
        log.debug("REST request to save OverheardComment : {}", overheardComment);
        if (overheardComment.getId() != null) {
            throw new BadRequestAlertException("A new overheardComment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OverheardComment result = overheardCommentService.save(overheardComment);
        return ResponseEntity.created(new URI("/api/overheard-comments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /overheard-comments} : Updates an existing overheardComment.
     *
     * @param overheardComment the overheardComment to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated overheardComment,
     * or with status {@code 400 (Bad Request)} if the overheardComment is not valid,
     * or with status {@code 500 (Internal Server Error)} if the overheardComment couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/overheard-comments")
    public ResponseEntity<OverheardComment> updateOverheardComment(@Valid @RequestBody OverheardComment overheardComment) throws URISyntaxException {
        log.debug("REST request to update OverheardComment : {}", overheardComment);
        if (overheardComment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OverheardComment result = overheardCommentService.save(overheardComment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, overheardComment.getId()))
            .body(result);
    }

    /**
     * {@code GET  /overheard-comments} : get all the overheardComments.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of overheardComments in body.
     */
    @GetMapping("/overheard-comments")
    public List<OverheardComment> getAllOverheardComments() {
        log.debug("REST request to get all OverheardComments");
        return overheardCommentService.findAll();
    }

    /**
     * {@code GET  /overheard-comments/:id} : get the "id" overheardComment.
     *
     * @param id the id of the overheardComment to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the overheardComment, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/overheard-comments/{id}")
    public ResponseEntity<OverheardComment> getOverheardComment(@PathVariable String id) {
        log.debug("REST request to get OverheardComment : {}", id);
        Optional<OverheardComment> overheardComment = overheardCommentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(overheardComment);
    }

    /**
     * {@code DELETE  /overheard-comments/:id} : delete the "id" overheardComment.
     *
     * @param id the id of the overheardComment to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/overheard-comments/{id}")
    public ResponseEntity<Void> deleteOverheardComment(@PathVariable String id) {
        log.debug("REST request to delete OverheardComment : {}", id);
        overheardCommentService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
