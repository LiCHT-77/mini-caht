package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/mixin"
)

// Room holds the schema definition for the Room entity.
type Room struct {
	ent.Schema
}

// Fields of the Room.
func (Room) Fields() []ent.Field {
	return []ent.Field{
		field.Int32("id").Unique(),
		field.String("name").Optional(),
		field.JSON("user_ids", []int32{}),
	}
}

// Edges of the Room.
func (Room) Edges() []ent.Edge {
	return nil
}

func (Room) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.Time{},
	}
}
