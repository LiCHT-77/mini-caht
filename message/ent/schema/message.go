package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/mixin"
)

// Message holds the schema definition for the Message entity.
type Message struct {
	ent.Schema
}

// Fields of the Message.
func (Message) Fields() []ent.Field {
	return []ent.Field{
		field.Int32("id").Unique(),
		field.Enum("type").Values("0"),
		field.Int32("user_id"),
		field.Int32("room_id"),
		field.String("text").Optional(),
	}
}

// Edges of the Message.
func (Message) Edges() []ent.Edge {
	return nil
}

func (Message) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.Time{},
	}
}
