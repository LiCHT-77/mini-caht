// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"time"

	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/LiCHT-77/mini-chat/message/ent/message"
)

// MessageCreate is the builder for creating a Message entity.
type MessageCreate struct {
	config
	mutation *MessageMutation
	hooks    []Hook
}

// SetCreateTime sets the "create_time" field.
func (mc *MessageCreate) SetCreateTime(t time.Time) *MessageCreate {
	mc.mutation.SetCreateTime(t)
	return mc
}

// SetNillableCreateTime sets the "create_time" field if the given value is not nil.
func (mc *MessageCreate) SetNillableCreateTime(t *time.Time) *MessageCreate {
	if t != nil {
		mc.SetCreateTime(*t)
	}
	return mc
}

// SetUpdateTime sets the "update_time" field.
func (mc *MessageCreate) SetUpdateTime(t time.Time) *MessageCreate {
	mc.mutation.SetUpdateTime(t)
	return mc
}

// SetNillableUpdateTime sets the "update_time" field if the given value is not nil.
func (mc *MessageCreate) SetNillableUpdateTime(t *time.Time) *MessageCreate {
	if t != nil {
		mc.SetUpdateTime(*t)
	}
	return mc
}

// SetType sets the "type" field.
func (mc *MessageCreate) SetType(m message.Type) *MessageCreate {
	mc.mutation.SetType(m)
	return mc
}

// SetUserID sets the "user_id" field.
func (mc *MessageCreate) SetUserID(i int32) *MessageCreate {
	mc.mutation.SetUserID(i)
	return mc
}

// SetRoomID sets the "room_id" field.
func (mc *MessageCreate) SetRoomID(i int32) *MessageCreate {
	mc.mutation.SetRoomID(i)
	return mc
}

// SetText sets the "text" field.
func (mc *MessageCreate) SetText(s string) *MessageCreate {
	mc.mutation.SetText(s)
	return mc
}

// SetNillableText sets the "text" field if the given value is not nil.
func (mc *MessageCreate) SetNillableText(s *string) *MessageCreate {
	if s != nil {
		mc.SetText(*s)
	}
	return mc
}

// SetID sets the "id" field.
func (mc *MessageCreate) SetID(i int32) *MessageCreate {
	mc.mutation.SetID(i)
	return mc
}

// Mutation returns the MessageMutation object of the builder.
func (mc *MessageCreate) Mutation() *MessageMutation {
	return mc.mutation
}

// Save creates the Message in the database.
func (mc *MessageCreate) Save(ctx context.Context) (*Message, error) {
	var (
		err  error
		node *Message
	)
	mc.defaults()
	if len(mc.hooks) == 0 {
		if err = mc.check(); err != nil {
			return nil, err
		}
		node, err = mc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*MessageMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = mc.check(); err != nil {
				return nil, err
			}
			mc.mutation = mutation
			if node, err = mc.sqlSave(ctx); err != nil {
				return nil, err
			}
			mutation.id = &node.ID
			mutation.done = true
			return node, err
		})
		for i := len(mc.hooks) - 1; i >= 0; i-- {
			if mc.hooks[i] == nil {
				return nil, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = mc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, mc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (mc *MessageCreate) SaveX(ctx context.Context) *Message {
	v, err := mc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (mc *MessageCreate) Exec(ctx context.Context) error {
	_, err := mc.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (mc *MessageCreate) ExecX(ctx context.Context) {
	if err := mc.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (mc *MessageCreate) defaults() {
	if _, ok := mc.mutation.CreateTime(); !ok {
		v := message.DefaultCreateTime()
		mc.mutation.SetCreateTime(v)
	}
	if _, ok := mc.mutation.UpdateTime(); !ok {
		v := message.DefaultUpdateTime()
		mc.mutation.SetUpdateTime(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (mc *MessageCreate) check() error {
	if _, ok := mc.mutation.CreateTime(); !ok {
		return &ValidationError{Name: "create_time", err: errors.New(`ent: missing required field "create_time"`)}
	}
	if _, ok := mc.mutation.UpdateTime(); !ok {
		return &ValidationError{Name: "update_time", err: errors.New(`ent: missing required field "update_time"`)}
	}
	if _, ok := mc.mutation.GetType(); !ok {
		return &ValidationError{Name: "type", err: errors.New(`ent: missing required field "type"`)}
	}
	if v, ok := mc.mutation.GetType(); ok {
		if err := message.TypeValidator(v); err != nil {
			return &ValidationError{Name: "type", err: fmt.Errorf(`ent: validator failed for field "type": %w`, err)}
		}
	}
	if _, ok := mc.mutation.UserID(); !ok {
		return &ValidationError{Name: "user_id", err: errors.New(`ent: missing required field "user_id"`)}
	}
	if _, ok := mc.mutation.RoomID(); !ok {
		return &ValidationError{Name: "room_id", err: errors.New(`ent: missing required field "room_id"`)}
	}
	return nil
}

func (mc *MessageCreate) sqlSave(ctx context.Context) (*Message, error) {
	_node, _spec := mc.createSpec()
	if err := sqlgraph.CreateNode(ctx, mc.driver, _spec); err != nil {
		if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{err.Error(), err}
		}
		return nil, err
	}
	if _spec.ID.Value != _node.ID {
		id := _spec.ID.Value.(int64)
		_node.ID = int32(id)
	}
	return _node, nil
}

func (mc *MessageCreate) createSpec() (*Message, *sqlgraph.CreateSpec) {
	var (
		_node = &Message{config: mc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: message.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt32,
				Column: message.FieldID,
			},
		}
	)
	if id, ok := mc.mutation.ID(); ok {
		_node.ID = id
		_spec.ID.Value = id
	}
	if value, ok := mc.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: message.FieldCreateTime,
		})
		_node.CreateTime = value
	}
	if value, ok := mc.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: message.FieldUpdateTime,
		})
		_node.UpdateTime = value
	}
	if value, ok := mc.mutation.GetType(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeEnum,
			Value:  value,
			Column: message.FieldType,
		})
		_node.Type = value
	}
	if value, ok := mc.mutation.UserID(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeInt32,
			Value:  value,
			Column: message.FieldUserID,
		})
		_node.UserID = value
	}
	if value, ok := mc.mutation.RoomID(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeInt32,
			Value:  value,
			Column: message.FieldRoomID,
		})
		_node.RoomID = value
	}
	if value, ok := mc.mutation.Text(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: message.FieldText,
		})
		_node.Text = value
	}
	return _node, _spec
}

// MessageCreateBulk is the builder for creating many Message entities in bulk.
type MessageCreateBulk struct {
	config
	builders []*MessageCreate
}

// Save creates the Message entities in the database.
func (mcb *MessageCreateBulk) Save(ctx context.Context) ([]*Message, error) {
	specs := make([]*sqlgraph.CreateSpec, len(mcb.builders))
	nodes := make([]*Message, len(mcb.builders))
	mutators := make([]Mutator, len(mcb.builders))
	for i := range mcb.builders {
		func(i int, root context.Context) {
			builder := mcb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*MessageMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				if err := builder.check(); err != nil {
					return nil, err
				}
				builder.mutation = mutation
				nodes[i], specs[i] = builder.createSpec()
				var err error
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, mcb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, mcb.driver, spec); err != nil {
						if sqlgraph.IsConstraintError(err) {
							err = &ConstraintError{err.Error(), err}
						}
					}
				}
				if err != nil {
					return nil, err
				}
				mutation.id = &nodes[i].ID
				mutation.done = true
				if specs[i].ID.Value != nil && nodes[i].ID == 0 {
					id := specs[i].ID.Value.(int64)
					nodes[i].ID = int32(id)
				}
				return nodes[i], nil
			})
			for i := len(builder.hooks) - 1; i >= 0; i-- {
				mut = builder.hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if len(mutators) > 0 {
		if _, err := mutators[0].Mutate(ctx, mcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (mcb *MessageCreateBulk) SaveX(ctx context.Context) []*Message {
	v, err := mcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (mcb *MessageCreateBulk) Exec(ctx context.Context) error {
	_, err := mcb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (mcb *MessageCreateBulk) ExecX(ctx context.Context) {
	if err := mcb.Exec(ctx); err != nil {
		panic(err)
	}
}
