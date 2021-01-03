package com.panda.overheard.service;

import com.panda.overheard.domain.OverheardComment;
import com.panda.overheard.repository.OverheardCommentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link OverheardComment}.
 */
@Service
public class OverheardCommentService {

    private final Logger log = LoggerFactory.getLogger(OverheardCommentService.class);

    private final OverheardCommentRepository overheardCommentRepository;

    public OverheardCommentService(OverheardCommentRepository overheardCommentRepository) {
        this.overheardCommentRepository = overheardCommentRepository;
    }

    /**
     * Save a overheardComment.
     *
     * @param overheardComment the entity to save.
     * @return the persisted entity.
     */
    public OverheardComment save(OverheardComment overheardComment) {
        log.debug("Request to save OverheardComment : {}", overheardComment);
        return overheardCommentRepository.save(overheardComment);
    }

    /**
     * Get all the overheardComments.
     *
     * @return the list of entities.
     */
    public List<OverheardComment> findAll() {
        log.debug("Request to get all OverheardComments");
        return overheardCommentRepository.findAll();
    }


    /**
     * Get one overheardComment by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<OverheardComment> findOne(String id) {
        log.debug("Request to get OverheardComment : {}", id);
        return overheardCommentRepository.findById(id);
    }

    /**
     * Delete the overheardComment by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete OverheardComment : {}", id);
        overheardCommentRepository.deleteById(id);
    }
}
