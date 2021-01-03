package com.panda.overheard.repository;

import com.panda.overheard.domain.Topic;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data MongoDB repository for the Topic entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TopicRepository extends MongoRepository<Topic, String> {
}
