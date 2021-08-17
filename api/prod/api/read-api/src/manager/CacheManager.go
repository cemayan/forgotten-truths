package manager

import (
	"github.com/allegro/bigcache/v3"
	log "github.com/sirupsen/logrus"
	"time"
)

var config = bigcache.Config{
	Shards:             64,
	LifeWindow:         999999 * time.Minute,
	CleanWindow: 		5 * time.Minute,
	MaxEntriesInWindow: 1000 * 10 * 60,
	MaxEntrySize:       500,
	Verbose:            true,
	HardMaxCacheSize:   8192,
	OnRemove:           nil,
	OnRemoveWithReason: nil,
}

func InitCache() *bigcache.BigCache {
	cache, err := bigcache.NewBigCache(config)

	if err != nil {
		log.Fatal(err)
	}

	return cache
}
