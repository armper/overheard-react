package com.panda.overheard.repository;

import com.panda.overheard.domain.OverheardComment;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data MongoDB repository for the OverheardComment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OverheardCommentRepository extends MongoRepository<OverheardComment, String> {
}
